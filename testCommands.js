const fs = require("fs");
const path = require("path");
const { SlashCommandBuilder } = require("discord.js");

const commandsPath = path.join(__dirname, "commands");
const folders = fs.readdirSync(commandsPath);

let total = 0;
let invalid = [];

console.log("🧪 Testing all slash commands locally...\n");

for (const folder of folders) {
  const folderPath = path.join(commandsPath, folder);

  if (fs.statSync(folderPath).isDirectory()) {
    const files = fs.readdirSync(folderPath).filter((f) => f.endsWith(".js"));

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      try {
        const cmd = require(filePath);
        if (!cmd.data || !(cmd.data instanceof SlashCommandBuilder)) {
          invalid.push(`${folder}/${file} → missing SlashCommandBuilder`);
        } else if (!cmd.data.name || !cmd.data.description) {
          invalid.push(`${folder}/${file} → name/description missing`);
        } else if (cmd.data.name.match(/[^a-z0-9-]/)) {
          invalid.push(`${folder}/${file} → invalid name (${cmd.data.name})`);
        } else {
          total++;
          console.log(`✅ ${folder}/${file} passed`);
        }
      } catch (err) {
        invalid.push(`${folder}/${file} → ${err.message}`);
      }
    }
  }
}

console.log("\n📊 Summary:");
console.log(`Total valid: ${total}`);
console.log(`Invalid: ${invalid.length}`);
if (invalid.length > 0) {
  console.log("\n⚠️ Invalid commands detected:");
  invalid.forEach((x) => console.log(" - " + x));
} else {
  console.log("✅ All commands are valid!");
}