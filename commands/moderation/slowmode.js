const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "slowmode",
  description: "Set slowmode for the current channel 🕐",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels))
      return message.reply("❌ You don't have permission to set slowmode.");

    const time = parseInt(args[0]);
    if (isNaN(time) || time < 0 || time > 21600)
      return message.reply("⚠️ Provide a valid time between 0 and 21600 seconds (6h).");

    await message.channel.setRateLimitPerUser(time);
    message.reply(`🕐 Slowmode set to **${time}s**.`);
  },
};