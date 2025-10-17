const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const blacklist = new Set();

module.exports = {
  name: "unbl",
  description: "Unblacklist a user ✅ / Retirer un utilisateur de la blacklist ✅",
  async execute(message) {
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator))
      return message.reply("❌ You don't have permission / Tu n’as pas la permission.");

    const userId = message.mentions.members.first()?.id || message.content.split(" ")[1];
    if (!userId) return message.reply("⚠️ Provide a user ID / Donne un ID utilisateur.");

    if (!blacklist.has(userId))
      return message.reply("ℹ️ This user is not blacklisted / Cet utilisateur n’est pas blacklisté.");

    blacklist.delete(userId);

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("✅ User Unblacklisted / Utilisateur retiré de la blacklist")
      .setDescription(`User ID **${userId}** removed from blacklist.`)
      .setFooter({ text: `By ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};