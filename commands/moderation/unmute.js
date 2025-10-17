const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "unmute",
  description: "Unmute a user 🔊 / Retirer le mute d’un utilisateur 🔊",
  async execute(message) {
    if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers))
      return message.reply("❌ You don't have permission / Tu n’as pas la permission.");

    const member = message.mentions.members.first();
    if (!member) return message.reply("⚠️ Mention someone to unmute / Mentionne quelqu’un à unmute.");

    await member.timeout(null);

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🔊 User Unmuted / Utilisateur démuté")
      .setDescription(`**${member.user.tag}** can now talk again!`)
      .setFooter({ text: `By ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};