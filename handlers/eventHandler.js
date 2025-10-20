import fs from "fs";
import path from "path";

/**
 * Register all event listeners
 * @param {Client} client - Discord client
 * @param {string} prefix - Command prefix
 */
export function registerEvents(client, prefix) {
  const eventsPath = path.join(process.cwd(), "events");

  if (!fs.existsSync(eventsPath)) {
    console.warn("⚠️ No 'events' folder found. Skipping event registration.");
    return;
  }

  const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    import(`../events/${file}`).then((eventModule) => {
      const event = eventModule.default;

      if (!event || !event.name || typeof event.execute !== "function") {
        console.warn(`⚠️ Invalid event in ${file}`);
        return;
      }

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client, prefix));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client, prefix));
      }

      console.log(`🎧 Event loaded: ${event.name}`);
    });
  }
}