const fs = require("fs");
const path = require("path");
const { REST, Routes, Collection } = require("discord.js");

async function loadCommands(client) {
  client.commands = new Collection();
  const commands = [];
  const base = path.join(__dirname, "../commands");

  if (!fs.existsSync(base)) {
    console.error("❌ Commands directory not found.");
    return;
  }

  const folders = fs.readdirSync(base);
  for (const folder of folders) {
    const folderPath = path.join(base, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const files = fs.readdirSync(folderPath).filter(f => f.endsWith(".js"));
    for (const file of files) {
      const commandPath = path.join(folderPath, file);
      const command = require(commandPath);

      if (!command?.data || !command?.execute) {
        console.warn(`⚠️ Skipped invalid command: ${folder}/${file}`);
        continue;
      }

      client.commands.set(command.data.name, command);
      commands.push(command.data.toJSON());
    }
  }

  // === REGISTER GLOBAL COMMANDS ===
  const token = process.env.TOKEN;
  const clientId = process.env.CLIENT_ID;

  if (!token || !clientId) {
    console.error("❌ Missing TOKEN or CLIENT_ID in .env");
    return;
  }

  const rest = new REST({ version: "10" }).setToken(token);

  try {
    console.log(`🌍 Registering ${commands.length} global commands...`);
    await rest.put(Routes.applicationCommands(clientId), { body: commands });
    console.log("✅ Commands successfully registered.");
  } catch (err) {
    console.error("❌ Error while registering commands:", err);
  }
}

module.exports = { loadCommands };
