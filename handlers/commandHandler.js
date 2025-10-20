import fs from "fs";
import path from "path";

export async function loadCommands(client, dir = "./commands") {
  const commandFiles = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of commandFiles) {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      await loadCommands(client, filePath);
    } else if (file.name.endsWith(".js")) {
      const command = (await import(`../${filePath}`)).default;
      client.commands.set(command.name, command);
      console.log(`✅ Loaded command: ${command.name}`);
    }
  }
}