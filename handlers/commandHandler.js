import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands(client, dir = "./commands") {
  const commandPath = path.join(__dirname, "../", dir);
  const entries = fs.readdirSync(commandPath, { withFileTypes: true });

  for (const entry of entries) {
    // Si c’est un dossier → on charge tous les fichiers dedans
    if (entry.isDirectory()) {
      const files = fs.readdirSync(`${commandPath}/${entry.name}`).filter(f => f.endsWith(".js"));
      for (const file of files) {
        const command = (await import(`../${dir}/${entry.name}/${file}`)).default;
        if (command?.name && typeof command.execute === "function") {
          client.commands.set(command.name.toLowerCase(), command);
          console.log(`✅ Loaded command: ${command.name}`);
        }
      }
    }
    // Si c’est un fichier JS → on le charge directement
    else if (entry.isFile() && entry.name.endsWith(".js")) {
      const command = (await import(`../${dir}/${entry.name}`)).default;
      if (command?.name && typeof command.execute === "function") {
        client.commands.set(command.name.toLowerCase(), command);
        console.log(`✅ Loaded command: ${command.name}`);
      }
    }
  }
}