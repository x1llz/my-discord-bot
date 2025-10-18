const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "uptime",
  description: "Show the bot uptime ⏱️",
  async execute(message) {
    const totalSeconds = process.uptime();
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("⏱️ Uptime")
      .setDescription(
        `> **${days}d ${hours}h ${minutes}m ${seconds}s**\nBot has been running smoothly 💪`
      )
      .setFooter({ text: "Made by X1LLZ | discord.gg/hellz" });

    message.channel.send({ embeds: [embed] });
  },
};