import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands(client, dir = "./commands") {
  const commandPath = path.join(__dirname, "../", dir);
  const folders = fs.readdirSync(commandPath);

  for (const folder of folders) {
    const files = fs.readdirSync(`${commandPath}/${folder}`).filter(f => f.endsWith(".js"));

    for (const file of files) {
      const command = (await import(`../${dir}/${folder}/${file}`)).default;
      if (command?.name && typeof command.execute === "function") {
        client.commands.set(command.name.toLowerCase(), command);
        console.log(`✅ Loaded command: ${command.name}`);
      } else {
        console.warn(`⚠️ Invalid command structure in ${file}`);
      }
    }
  }
}