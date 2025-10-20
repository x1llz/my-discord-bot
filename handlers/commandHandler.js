import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands(client, dir = "./commands") {
  const basePath = path.join(__dirname, "../", dir);
  const entries = fs.readdirSync(basePath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(basePath, entry.name);

    // 📁 Dossier => charge les fichiers à l’intérieur
    if (entry.isDirectory()) {
      const files = fs.readdirSync(fullPath).filter(f => f.endsWith(".js"));
      for (const file of files) {
        await importCommand(client, path.join(fullPath, file));
      }
    }

    // 📄 Fichier JS directement dans /commands
    else if (entry.isFile() && entry.name.endsWith(".js")) {
      await importCommand(client, fullPath);
    }
  }
}

async function importCommand(client, filePath) {
  try {
    const fileUrl = pathToFileURL(filePath).href;
    const command = (await import(fileUrl)).default;

    if (command?.name && typeof command.execute === "function") {
      client.commands.set(command.name.toLowerCase(), command);
      console.log(`✅ Loaded command: ${command.name}`);
    } else {
      console.warn(`⚠️ Invalid command format in ${filePath}`);
    }
  } catch (err) {
    console.error(`❌ Error loading ${filePath}: ${err.message}`);
  }
}