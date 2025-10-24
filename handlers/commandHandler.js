const fs = require("fs");
const path = require("path");
const { REST, Routes } = require("discord.js");

async function loadCommands(client) {
  const commands = [];
  const commandsPath = path.join(__dirname, "../commands");

  const folders = fs.readdirSync(commandsPath);
  console.log("📂 Scanning command folders:", folders);

  for (const folder of folders) {
    const folderPath = path.join(commandsPath, folder);

    if (fs.statSync(folderPath).isDirectory()) {
      const files = fs.readdirSync(folderPath).filter((f) => f.endsWith(".js"));
      for (const file of files) {
        const filePath = path.join(folderPath, file);
        try {
          const cmd = require(filePath);
          if (cmd.data && cmd.execute) {
            client.commands.set(cmd.data.name, cmd);
            commands.push(cmd.data.toJSON());
            console.log(`✅ Loaded: ${folder}/${file}`);
          } else {
            console.warn(`⚠️ Skipped (invalid format): ${folder}/${file}`);
          }
        } catch (err) {
          console.error(`❌ Error loading ${folder}/${file}:`, err.message);
        }
      }
    } else if (folder.endsWith(".js")) {
      const cmd = require(path.join(commandsPath, folder));
      if (cmd.data && cmd.execute) {
        client.commands.set(cmd.data.name, cmd);
        commands.push(cmd.data.toJSON());
        console.log(`✅ Loaded: ${folder}`);
      }
    }
  }

  console.log(`\n📋 ${commands.length} commands ready to register individually.`);

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  try {
    console.log("🚀 Registering slash commands one by one...\n");

    for (const cmd of commands) {
      try {
        await rest.post(
          Routes.applicationGuildCommands(
            process.env.CLIENT_ID,
            process.env.GUILD_ID
          ),
          { body: cmd }
        );
        console.log(`✅ Registered: /${cmd.name}`);
      } catch (err) {
        console.error(`❌ Failed to register: /${cmd.name}`);
        console.error("Reason:", err.rawError || err);
      }
    }

    console.log("\n🎯 Slash registration complete!");
  } catch (err) {
    console.error("❌ Fatal error registering commands:", err);
  }
}

module.exports = { loadCommands };