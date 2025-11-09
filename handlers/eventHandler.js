const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const baseDir = path.join(__dirname, "../events");

  if (!fs.existsSync(baseDir)) {
    console.error("❌ No events directory found.");
    return;
  }

  const categories = fs.readdirSync(baseDir);
  for (const category of categories) {
    const folderPath = path.join(baseDir, category);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const files = fs.readdirSync(folderPath).filter(f => f.endsWith(".js"));
    for (const file of files) {
      const eventPath = path.join(folderPath, file);
      try {
        const event = require(eventPath);

        if (!event || !event.name || typeof event.execute !== "function") {
          console.warn(`⚠️ Skipped event ${file} (missing name or execute).`);
          continue;
        }

        const bind = (...args) => event.execute(...args, client);
        if (event.once) client.once(event.name, bind);
        else client.on(event.name, bind);
      } catch (err) {
        console.error(`❌ Error loading event ${file}:`, err);
      }
    }
  }

  console.log("✅ All events successfully loaded.");
};
