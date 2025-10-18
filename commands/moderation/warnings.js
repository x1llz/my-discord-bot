const { EmbedBuilder } = require("discord.js");

const warns = new Map();

module.exports = {
  name: "warnings",
  description: "Show all warnings for a user 🧾",
  async execute(message, args) {
    const target = message.mentions.members.first();
    if (!target) return message.reply("⚠️ Mention a user to view their warnings.");

    const userWarns = warns.get(target.id) || [];
    if (userWarns.length === 0)
      return message.reply("✅ This user has no warnings.");

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle(`📋 Warnings for ${target.user.tag}`)
      .setDescription(
        userWarns
          .map((w, i) => `**${i + 1}.** ${w.reason} — <t:${Math.floor(w.date / 1000)}:R>`)
          .join("\n")
      );

    message.channel.send({ embeds: [embed] });
  },
};