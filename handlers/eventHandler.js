import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerEvents(client, PREFIX) {
  const eventsPath = path.join(__dirname, "../events");
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = (await import(filePath)).default;

    if (event?.name) {
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client, PREFIX));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client, PREFIX));
      }
    }
  }

  console.log("✅ All events registered successfully!");
}