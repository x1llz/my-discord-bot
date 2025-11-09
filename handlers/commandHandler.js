const fs = require("fs");
const path = require("path");
const { REST, Routes, Collection } = require("discord.js");

module.exports = async (client) => {
  const commands = [];
  client.commands = new Collection();

  const basePath = path.join(__dirname, "../commands");
  if (!fs.existsSync(basePath)) {
    console.error("❌ Commands folder not found.");
    return;
  }

  const folders = fs.readdirSync(basePath);
  for (const folder of folders) {
    const folderPath = path.join(basePath, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const files = fs.readdirSync(folderPath).filter(f => f.endsWith(".js"));
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      try {
        const command = require(filePath);
        if (!command?.data?.name || !command?.execute) {
          console.warn(`⚠️ Skipped ${folder}/${file} (invalid structure).`);
          continue;
        }

        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
      } catch (err) {
        console.error(`❌ Failed to load ${folder}/${file}:`, err);
      }
    }
  }

  // === Global Registration ===
  const token = process.env.TOKEN;
  const clientId = process.env.CLIENT_ID;
  if (!token || !clientId) return console.error("❌ Missing TOKEN or CLIENT_ID in .env");

  const rest = new REST({ version: "10" }).setToken(token);
  try {
    console.log(`🌍 Registering ${commands.length} global commands...`);
    await rest.put(Routes.applicationCommands(clientId), { body: commands });
    console.log(`✅ ${commands.length} global commands active.`);
  } catch (err) {
    console.error("❌ Error registering slash commands:", err);
  }
};
