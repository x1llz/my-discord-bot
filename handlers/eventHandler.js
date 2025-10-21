// src/handlers/eventHandler.js
import fs from "fs";
import path from "path";

export function registerEvents(client, PREFIX) {
  const eventsPath = path.resolve("./events");
  if (!fs.existsSync(eventsPath)) return console.warn("⚠️ No events folder found.");

  const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith(".js"));

  for (const file of eventFiles) {
    import(`../events/${file}`).then(eventModule => {
      const event = eventModule.default;
      if (!event || !event.name) return;

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client, PREFIX));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client, PREFIX));
      }

      console.log(`✅ Event loaded: ${event.name}`);
    }).catch(err => console.error(`❌ Error loading event ${file}:`, err));
  }

  // Default messageCreate listener for prefix commands
  client.on("messageCreate", async (message) => {
    try {
      if (!message.content.startsWith(PREFIX) || message.author.bot) return;

      const args = message.content.slice(PREFIX.length).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();
      const command = client.commands.get(commandName);
      if (!command) return;

      await command.execute(client, message, args);
    } catch (err) {
      console.error("⚠️ Command error:", err);
      if (message && message.reply) {
        message.reply("❌ An unexpected error occurred while running that command.");
      }
    }
  });
}