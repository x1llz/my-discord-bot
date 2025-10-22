import fs from "fs";
import path from "path";
import { pathToFileURL, fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands(client, dir = "./commands") {
  const basePath = path.join(__dirname, "..", dir);
  if (!fs.existsSync(basePath)) return;

  const entries = fs.readdirSync(basePath);
  for (const entry of entries) {
    const fullPath = path.join(basePath, entry);
    const stat = fs.lstatSync(fullPath);

    // 📂 si c’est un dossier
    if (stat.isDirectory()) {
      const files = fs.readdirSync(fullPath).filter(f => f.endsWith(".js"));
      for (const file of files) {
        const filePath = path.join(fullPath, file);
        const commandModule = await import(pathToFileURL(filePath).href);
        const command = commandModule.default;
        if (command?.name && typeof command.execute === "function") {
          client.commands.set(command.name.toLowerCase(), command);
          console.log(`✅ Loaded command: ${command.name}`);
        }
      }
    }

    // 📄 si c’est un fichier JS directement (ex: copy.js)
    else if (entry.endsWith(".js")) {
      const commandModule = await import(pathToFileURL(fullPath).href);
      const command = commandModule.default;
      if (command?.name && typeof command.execute === "function") {
        client.commands.set(command.name.toLowerCase(), command);
        console.log(`✅ Loaded command: ${command.name}`);
      }
    }
  }
}