import { EmbedBuilder } from "discord.js";

export default {
  name: "uptime",
  description: "Shows how long the bot has been running.",
  async execute(message, args, client) {
    const totalSeconds = Math.floor(process.uptime());
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("⏰ Bot Uptime")
      .setDescription(`> **${hours}h ${minutes}m ${seconds}s**`)
      .setFooter({ text: "Made by X1LLZ 💻 | discord.gg/hellz" });

    message.channel.send({ embeds: [embed] });
  },
};