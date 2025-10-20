import fs from "fs";
import path from "path";

/**
 * Load all bot commands recursively
 * @param {Client} client - Discord client
 * @param {string} dir - Path to commands folder
 */
export async function loadCommands(client, dir = "./commands") {
  try {
    const commandFiles = fs.readdirSync(dir);

    for (const file of commandFiles) {
      const filePath = path.join(dir, file);
      const stat = fs.lstatSync(filePath);

      // 📁 Load subfolders recursively
      if (stat.isDirectory()) {
        await loadCommands(client, filePath);
        continue;
      }

      // ✅ Load .js files only
      if (!file.endsWith(".js")) continue;

      // Dynamic import (ESM compatible)
      const { default: command } = await import(`../${filePath.replace(/\\/g, "/")}`);

      if (command?.name && typeof command.execute === "function") {
        client.commands.set(command.name.toLowerCase(), command);
        console.log(`✅ Command loaded: ${command.name}`);
      } else {
        console.warn(`⚠️ Invalid command file: ${file}`);
      }
    }

    console.log("🎯 All commands loaded successfully!");
  } catch (err) {
    console.error("❌ Error loading commands:", err);
  }
}