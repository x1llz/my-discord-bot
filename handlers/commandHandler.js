import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

/**
 * Load all commands recursively from /commands
 */
export async function loadCommands(client, dir = "./commands") {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.lstatSync(fullPath);

    if (stat.isDirectory()) {
      await loadCommands(client, fullPath);
    } else if (file.endsWith(".js")) {
      try {
        const { default: command } = await import(pathToFileURL(fullPath));
        if (command?.name && typeof command.execute === "function") {
          client.commands.set(command.name.toLowerCase(), command);
          console.log(`✅ Loaded command: ${command.name}`);
        } else {
          console.warn(`⚠️ Invalid command in: ${file}`);
        }
      } catch (err) {
        console.error(`❌ Failed to load ${file}:`, err);
      }
    }
  }
}