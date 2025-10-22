// handlers/eventHandler.js
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

export async function registerEvents(client, PREFIX) {
  const eventsPath = path.resolve("./events");
  if (!fs.existsSync(eventsPath)) return;

  const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith(".js"));

  for (const file of eventFiles) {
    try {
      const eventModule = await import(pathToFileURL(path.join(eventsPath, file)));
      const event = eventModule.default;
      if (!event?.name) continue;

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client, PREFIX));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client, PREFIX));
      }

      console.log(`✅ Event loaded: ${event.name}`);
    } catch (err) {
      console.error(`❌ Error loading event ${file}:`, err);
    }
  }

  // Fallback message listener (prefix system)
  client.on("messageCreate", async (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();
    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      await command.execute(client, message, args);
    } catch (err) {
      console.error(err);
      message.reply("⚠️ An error occurred while executing that command.");
    }
  });
}