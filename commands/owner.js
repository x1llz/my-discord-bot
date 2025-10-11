const fs = require("fs");
const path = require("path");

module.exports = {
  name: "owner",
  description: "Add a new bot owner (only the creator can use this).",

  async execute(message, args) {
    const creatorId = "1187100546683899995";
    if (message.author.id !== creatorId)
      return message.reply("🚫 Only the bot creator can use this command.");

    if (!args[0]) return message.reply("❌ Please mention a user or provide their ID.");

    const ownersPath = path.join(__dirname, "../data/owners.json");
    const owners = JSON.parse(fs.readFileSync(ownersPath, "utf8"));
    const targetId = args[0].replace(/[<@!>]/g, "");

    if (owners.includes(targetId)) return message.reply("⚠️ That user is already an owner.");

    owners.push(targetId);
    fs.writeFileSync(ownersPath, JSON.stringify(owners, null, 2));

    message.reply(`👑 <@${targetId}> is now a **bot owner**.`);
  },
};
