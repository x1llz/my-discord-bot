const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const blacklist = new Set();

module.exports = {
  name: "bl",
  description: "Blacklist a user 🚫 / Blacklister un utilisateur 🚫",
  async execute(message) {
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator))
      return message.reply("❌ You don't have permission / Tu n’as pas la permission.");

    const member = message.mentions.members.first();
    if (!member) return message.reply("⚠️ Mention someone / Mentionne quelqu’un.");

    blacklist.add(member.id);

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🚫 User Blacklisted / Utilisateur blacklisté")
      .setDescription(`**${member.user.tag}** is now blacklisted from the server.`)
      .setFooter({ text: `By ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
    await member.kick("Blacklisted");
  },
};