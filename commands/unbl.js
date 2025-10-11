const fs = require("fs");
const path = require("path");

module.exports = {
  name: "unbl",
  description: "Remove a user from the blacklist.",

  async execute(message, args) {
    const blacklistPath = path.join(__dirname, "../data/blacklist.json");
    let blacklist = JSON.parse(fs.readFileSync(blacklistPath, "utf8"));

    if (!args[0]) return message.reply("❌ Please mention a user or provide their ID.");

    const targetId = args[0].replace(/[<@!>]/g, "");
    if (!blacklist.includes(targetId)) return message.reply("⚠️ That user is not blacklisted.");

    blacklist = blacklist.filter(id => id !== targetId);
    fs.writeFileSync(blacklistPath, JSON.stringify(blacklist, null, 2));

    message.reply(`✅ User <@${targetId}> has been **removed from the blacklist**.`);
  },
};
