import { EmbedBuilder } from "discord.js";

export default {
  name: "ping",
  description: "Check the bot's latency 📶",
  async execute(message) {
    const embed = new EmbedBuilder()
      .setColor("#00FFFF")
      .setTitle("🏓 Pong!")
      .setDescription(`Latency: **${Date.now() - message.createdTimestamp}ms**`)
      .setFooter({ text: "Hellz Bot | discord.gg/hellz" });

    message.channel.send({ embeds: [embed] });
  },
};