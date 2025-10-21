import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export async function loadCommands(client, baseDir = "./commands") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const dirPath = path.join(__dirname, "../commands");

  const files = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dirPath, file.name);

    if (file.isDirectory()) {
      await loadCommands(client, fullPath);
    } else if (file.name.endsWith(".js")) {
      const { default: command } = await import(fullPath);
      if (command?.name && typeof command.execute === "function") {
        client.commands.set(command.name.toLowerCase(), command);
        console.log(`🧩 Command loaded: ${command.name}`);
      }
    }
  }
}