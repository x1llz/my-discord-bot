import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands(client, basePath = "./commands") {
  const commandsPath = path.resolve(basePath);
  const categories = fs.readdirSync(commandsPath, { withFileTypes: true });

  for (const category of categories) {
    if (category.isDirectory()) {
      const folderPath = path.join(commandsPath, category.name);
      const commandFiles = fs.readdirSync(folderPath).filter(f => f.endsWith(".js"));

      for (const file of commandFiles) {
        const filePath = path.join(folderPath, file);
        try {
          const commandModule = await import(`file://${filePath}`);
          const command = commandModule.default || commandModule;
          if (!command.name || typeof command.execute !== "function") continue;

          client.commands.set(command.name, command);
          console.log(`✅ Loaded command: ${command.name}`);
        } catch (err) {
          console.error(`❌ Error loading command ${file}:`, err);
        }
      }
    } else if (category.isFile() && category.name.endsWith(".js")) {
      const filePath = path.join(commandsPath, category.name);
      try {
        const commandModule = await import(`file://${filePath}`);
        const command = commandModule.default || commandModule;
        if (!command.name || typeof command.execute !== "function") continue;

        client.commands.set(command.name, command);
        console.log(`✅ Loaded command: ${command.name}`);
      } catch (err) {
        console.error(`❌ Error loading command ${category.name}:`, err);
      }
    }
  }
}