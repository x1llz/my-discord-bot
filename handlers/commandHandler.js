import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands(client, commandsPath = "./commands") {
  const absPath = path.resolve(commandsPath);
  const walk = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.isFile() && e.name.endsWith(".js")) {
        // dynamic import to support ESM
        import(full + `?update=${Date.now()}`).then(mod => {
          const command = mod.default || mod;
          if (command?.name && typeof command.execute === "function") {
            client.commands.set(command.name.toLowerCase(), command);
            console.log(`✅ Command loaded: ${command.name}`);
          } else {
            console.warn(`⚠️ Invalid command at ${full}`);
          }
        }).catch(err => console.error("Import command error:", err));
      }
    }
  };
  walk(absPath);
}
