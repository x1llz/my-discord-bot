const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "giveaway",
  description: "Start a giveaway 🎁",
  async execute(message, args) {
    if (!message.member.permissions.has("ManageMessages"))
      return message.reply("❌ You don't have permission to start giveaways.");

    const duration = parseInt(args[0]);
    const prize = args.slice(1).join(" ");

    if (!duration