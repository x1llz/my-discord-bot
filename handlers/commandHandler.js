
const fs = require("fs");
const path = require("path");
const { REST, Routes, Collection } = require("discord.js");

async function loadCommands(client) {
  client.commands = new Collection();
  const commands = [];
  const base = path.join(__dirname, "../commands");

  if (!fs.existsSync(base)) return console.error("❌ No commands directory found.");

  const folders = fs.readdirSync(base);
  for (const folder of folders) {
    const folderPath = path.join(base, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const files = fs.readdirSync(folderPath).filter(f => f.endsWith(".js"));
    for (const file of files) {
      const cmdPath = path.join(folderPath, file);
      const command = require(cmdPath);
      if (!command?.data || !command?.execute) {
        console.warn(`⚠️ Skipped ${folder}/${file} (missing data or execute).`);
        continue;
      }
      client.commands.set(command.data.name, command);
      try {
        commands.push(command.data.toJSON());
      } catch {
        console.warn(`⚠️ Skipped ${folder}/${file} (invalid SlashCommandBuilder).`);
      }
    }
  }

  // Register GLOBAL commands
  const token = process.env.TOKEN;
  const clientId = process.env.CLIENT_ID;
  if (!token || !clientId) {
    console.error("❌ Missing TOKEN or CLIENT_ID in environment. Cannot register slash commands.");
    return;
  }

  const rest = new REST({ version: "10" }).setToken(token);
  try {
    console.log(`🌐 Registering ${commands.length} global slash commands...`);
    await rest.put(Routes.applicationCommands(clientId), { body: commands });
    console.log("✅ Global slash commands registered.");
  } catch (err) {
    console.error("❌ Failed to register global commands:", err?.rawError || err);
  }
}

module.exports = { loadCommands };
