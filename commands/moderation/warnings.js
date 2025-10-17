const { EmbedBuilder } = require("discord.js");
const warns = new Map();

module.exports = {
  name: "warnings",
  description: "Show user warnings 📜 / Voir les avertissements d’un utilisateur 📜",
  async execute(message) {
    const member = message.mentions.members.first() || message.member;
    const userWarns = warns.get(member.id);

    if (!userWarns || userWarns.length === 0)
      return message.reply("✅ No warnings / Aucun avertissement.");

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle(`⚠️ Warnings for ${member.user.tag}`)
      .setDescription(userWarns.map((w, i) => `**${i + 1}.** ${w.reason} — *by ${w.by}*`).join("\n"))
      .setFooter({ text: `Total: ${userWarns.length}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};