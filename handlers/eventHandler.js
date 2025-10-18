import fs from "fs";
import path from "path";

export function registerEvents(client, PREFIX) {
  const eventsPath = path.resolve("./events");
  const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith(".js"));

  const loadedEvents = new Set();

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    delete require.cache[filePath]; // clear cache
    const event = require(filePath);

    if (!event.name || typeof event.execute !== "function") continue;
    if (loadedEvents.has(event.name)) continue; // prevent duplicates
    loadedEvents.add(event.name);

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client, PREFIX));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client, PREFIX));
    }
  }

  console.log(`✅ Loaded ${loadedEvents.size} unique events.`);
}