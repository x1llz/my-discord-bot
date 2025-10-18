import { PermissionFlagsBits } from "discord.js";

export default {
  name: "slowmode",
  description: "Set slowmode for the current channel (seconds)",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels))
      return message.reply("❌ You don't have permission to set slowmode.");

    const seconds = parseInt(args[0]);
    if (isNaN(seconds) || seconds < 0 || seconds > 21600)
      return message.reply("⚠️ Provide a valid number of seconds (0 - 21600).");

    try {
      await message.channel.setRateLimitPerUser(seconds);
      return message.reply(`✅ Slowmode set to **${seconds}s**.`);
    } catch (err) {
      console.error(err);
      return message.reply("❌ Failed to set slowmode.");
    }
  },
};