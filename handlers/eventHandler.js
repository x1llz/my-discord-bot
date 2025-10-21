import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export function registerEvents(client, PREFIX) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const eventsPath = path.join(__dirname, "../events");
  const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith(".js"));

  for (const file of eventFiles) {
    import(`../events/${file}`).then(event => {
      const eventName = file.split(".")[0];
      client.removeAllListeners(eventName);
      client.on(eventName, (...args) =>
        event.default(client, PREFIX, ...args)
      );
      console.log(`✅ Event loaded: ${eventName}`);
    });
  }
}