const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "unmute",
  description: "Unmute a user 🔈",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers))
      return message.reply("❌ You don't have permission to unmute members.");

    const member = message.mentions.members.first();
    if (!member) return message.reply("⚠️ Mention a user to unmute.");

    await member.timeout(null);

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🔈 User Unmuted")
      .setDescription(`**${member.user.tag}** has been unmuted.`)
      .setFooter({ text: `Action by ${message.author.tag}` });

    message.channel.send({ embeds: [embed] });
  },
};