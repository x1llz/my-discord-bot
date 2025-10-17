const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "unban",
  description: "Unban a user 🔓 / Débannir un utilisateur 🔓",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.BanMembers))
      return message.reply("❌ You don't have permission / Tu n’as pas la permission.");

    const userId = args[0];
    if (!userId) return message.reply("⚠️ Provide a user ID / Donne un ID utilisateur.");

    try {
      await message.guild.members.unban(userId);

      const embed = new EmbedBuilder()
        .setColor("#3498db")
        .setTitle("🔓 User Unbanned / Utilisateur débanni")
        .setDescription(`User with ID **${userId}** has been unbanned.`)
        .setFooter({ text: `By ${message.author.tag}` })
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      message.reply("❌ Could not unban / Impossible de débannir.");
    }
  },
};