import { EmbedBuilder } from "discord.js";

export default {
  name: "avatar",
  description: "Display a user's avatar 🖼️",
  async execute(message) {
    const user = message.mentions.users.first() || message.author;

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle(`${user.username}'s Avatar`)
      .setImage(user.displayAvatarURL({ size: 1024, dynamic: true }))
      .setFooter({ text: "Made by X1LLZ | discord.gg/hellz" });

    return message.channel.send({ embeds: [embed] });
  },
};