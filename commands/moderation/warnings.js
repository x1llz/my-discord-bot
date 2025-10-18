import { EmbedBuilder } from "discord.js";

export default {
  name: "warnings",
  description: "Show all warnings for a member 🧾",
  async execute(message) {
    const member = message.mentions.members.first() || message.member;

    const embed = new EmbedBuilder()
      .setColor("#2ecc71")
      .setTitle("⚠️ Warnings List")
      .setDescription(`Currently no stored warning data for **${member.user.tag}**`)
      .setFooter({ text: "Hellz Bot | Made by x1llz" });

    message.channel.send({ embeds: [embed] });
  },
};