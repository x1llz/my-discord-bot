import { EmbedBuilder } from "discord.js";

export default {
  name: "emojis",
  description: "List all emojis of this server 😎",
  async execute(message) {
    const emojis = message.guild.emojis.cache.map(e => e.toString()).join(" ");
    const embed = new EmbedBuilder()
      .setColor("#2ecc71")
      .setTitle("😋 Server Emojis")
      .setDescription(emojis.length ? emojis : "No emojis found in this server.")
      .setFooter({ text: "Hellz V2 | discord.gg/hellz" });

    message.channel.send({ embeds: [embed] });
  },
};