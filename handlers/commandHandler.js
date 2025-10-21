import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Charge toutes les commandes dans le dossier /commands et ses sous-dossiers
 */
export async function loadCommands(client, baseDir = "./commands") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const commandsPath = path.join(__dirname, "../commands");

  async function readDirRecursively(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      // Ignore fichiers cachés
      if (entry.name.startsWith(".")) continue;

      if (entry.isDirectory()) {
        await readDirRecursively(fullPath);
      } else if (entry.name.endsWith(".js")) {
        try {
          const { default: command } = await import(fullPath + "?update=" + Date.now());
          if (!command?.name || typeof command.execute !== "function") continue;

          const name = command.name.toLowerCase();
          if (client.commands.has(name)) continue;

          client.commands.set(name, command);
          console.log(`🧩 Command loaded: ${name}`);
        } catch (err) {
          console.error(`❌ Error loading ${entry.name}:`, err.message);
        }
      }
    }
  }

  await readDirRecursively(commandsPath);
}