const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const warns = new Map();

module.exports = {
  name: "clearwarns",
  description: "Clear all warnings of a user 🧹 / Effacer tous les avertissements d’un utilisateur 🧹",
  async execute(message) {
    if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers))
      return message.reply("❌ You don't have permission / Tu n’as pas la permission.");

    const member = message.mentions.members.first();
    if (!member) return message.reply("⚠️ Mention someone / Mentionne quelqu’un.");

    warns.delete(member.id);

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🧹 Warnings Cleared / Avertissements effacés")
      .setDescription(`All warnings for **${member.user.tag}** have been cleared.`)
      .setFooter({ text: `By ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};