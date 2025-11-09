const fs = require("fs");
const path = require("path");

function loadEvents(client) {
  const eventsDir = path.join(__dirname, "../events");

  const categories = fs.readdirSync(eventsDir);
  for (const category of categories) {
    const folder = path.join(eventsDir, category);
    const files = fs.readdirSync(folder).filter(f => f.endsWith(".js"));

    for (const file of files) {
      const event = require(path.join(folder, file));
      if (event.once)
        client.once(event.name, (...args) => event.execute(...args, client));
      else client.on(event.name, (...args) => event.execute(...args, client));
    }
  }
  console.log("✅ Events loaded.");
}

module.exports = { loadEvents };
