// handlers/commandHandler.js
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands(client, dirPath = path.join(__dirname, "../commands")) {
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        await loadCommands(client, fullPath);
      } else if (entry.name.endsWith(".js")) {
        try {
          const commandModule = await import(pathToFileURL(fullPath));
          const command = commandModule.default;

          if (command?.name && typeof command.execute === "function") {
            client.commands.set(command.name.toLowerCase(), command);
            console.log(`✅ Command loaded: ${command.name}`);
          } else {
            console.warn(`⚠️ Invalid command format in: ${entry.name}`);
          }
        } catch (err) {
          console.error(`❌ Failed to load ${entry.name}:`, err);
        }
      }
    }
  } catch (err) {
    console.error("❌ Error reading command folders:", err);
  }
}