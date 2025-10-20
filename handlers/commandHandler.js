import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands(client, dir = "./commands") {
  const basePath = path.join(__dirname, "../", dir);
  const entries = fs.readdirSync(basePath, { withFileTypes: true });

  for (const entry of entries) {
    // ✅ Cas 1 : Dossier
    if (entry.isDirectory()) {
      const subFiles = fs
        .readdirSync(path.join(basePath, entry.name))
        .filter(f => f.endsWith(".js"));

      for (const file of subFiles) {
        try {
          const filePath = `../${dir}/${entry.name}/${file}`;
          const command = (await import(filePath)).default;
          if (command?.name && typeof command.execute === "function") {
            client.commands.set(command.name.toLowerCase(), command);
            console.log(`✅ Loaded command: ${command.name}`);
          }
        } catch (err) {
          console.error(`❌ Error loading ${entry.name}/${file}:`, err.message);
        }
      }
    }

    // ✅