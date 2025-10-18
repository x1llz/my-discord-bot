const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "removeowner",
  description: "Remove an owner 👑❌",
  async execute(message, args, client) {
    if (!client.owner) return message.reply("⚠️ There is no current owner set.");

    client.owner = null;

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("❌ Owner Removed")
      .setDescription("The bot owner has been removed.");

    message.channel.send({ embeds: [embed] });
  },
};