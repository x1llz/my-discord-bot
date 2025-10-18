import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands(client, baseDir = "./commands") {
  const commandsPath = path.resolve(__dirname, "..", baseDir);

  const load = (dir) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.lstatSync(filePath);

      if (stat.isDirectory()) {
        load(filePath);
      } else if (file.endsWith(".js")) {
        import(`file://${filePath}`).then((cmd) => {
          const command = cmd.default || cmd;
          if (command.name && typeof command.execute === "function") {
            client.commands.set(command.name.toLowerCase(), command);
            console.log(`✅ Command loaded: ${command.name}`);
          } else {
            console.warn(`⚠️ Invalid command structure in: ${file}`);
          }
        }).catch((err) => {
          console.error(`❌ Error loading command ${file}:`, err);
        });
      }
    }
  };

  load(commandsPath);
}