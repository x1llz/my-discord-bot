import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands(client, dir = "commands") {
  const commandsPath = path.join(__dirname, "..", dir);
  if (!fs.existsSync(commandsPath)) return;

  const files = fs.readdirSync(commandsPath, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      await loadCommands(client, path.join(dir, file.name));
    } else if (file.name.endsWith(".js")) {
      const filePath = path.join("..", dir, file.name);
      const commandModule = await import(pathToFileURL(path.join(__dirname, filePath)));
      const command = commandModule.default || commandModule;

      if (command?.name && typeof command.execute === "function") {
        client.commands.set(command.name.toLowerCase(), command);
        console.log(`✅ Loaded command: ${command.name}`);
      }
    }
  }
}