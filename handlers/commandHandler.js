import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export async function loadCommands(client, dir = "./commands") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const directory = path.join(__dirname, "../commands");

  const files = fs.readdirSync(directory, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(directory, file.name);

    // ✅ Ignore hidden files or already loaded duplicates
    if (file.name.startsWith(".")) continue;

    if (file.isDirectory()) {
      await loadCommands(client, fullPath);
    } else if (file.name.endsWith(".js")) {
      // Prevent reloading duplicate command names
      const { default: command } = await import(fullPath + "?update=" + Date.now());
      if (command?.name && typeof command.execute === "function") {
        if (client.commands.has(command.name.toLowerCase())) continue;
        client.commands.set(command.name.toLowerCase(), command);
        console.log(`🧩 Command loaded: ${command.name}`);
      }
    }
  }
}