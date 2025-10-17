const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "uptime",
  description: "Shows how long the bot has been online ⏱️",

  async execute(message) {
    const totalSeconds = Math.floor(process.uptime());
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("⏱️ Bot Uptime")
      .setDescription(`🟢 **Online for:** ${uptimeString}`)
      .setFooter({
        text: "Made by X1LLZ | discord.gg/hellz",
      })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};