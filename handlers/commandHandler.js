import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands(client, dir) {
  const commandFolders = fs.readdirSync(dir);

  for (const folder of commandFolders) {
    const folderPath = path.join(dir, folder);
    const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
      const filePath = path.join(folderPath, file);
      const command = (await import(`../${filePath.replace(/\\/g, "/")}`)).default;

      if (command?.name && typeof command.execute === "function") {
        client.commands.set(command.name, command);
        console.log(`✅ Loaded command: ${command.name}`);
      }
    }
  }

  console.log("✅ All commands loaded successfully!");
}