const fs = require("fs");
const path = require("path");

module.exports = {
  name: "bl",
  description: "Blacklist a user from using the bot.",

  async execute(message, args) {
    const blacklistPath = path.join(__dirname, "../data/blacklist.json");
    const blacklist = JSON.parse(fs.readFileSync(blacklistPath, "utf8"));

    if (!args[0]) return message.reply("❌ Please mention a user or provide their ID.");

    const targetId = args[0].replace(/[<@!>]/g, "");
    if (blacklist.includes(targetId)) return message.reply("⚠️ That user is already blacklisted.");

    blacklist.push(targetId);
    fs.writeFileSync(blacklistPath, JSON.stringify(blacklist, null, 2));

    message.reply(`🚫 User <@${targetId}> has been **blacklisted**.`);
  },
};
