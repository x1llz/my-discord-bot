const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "unban",
  description: "Unban a user 🕊️",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.BanMembers))
      return message.reply("❌ You don't have permission to unban members.");

    const userId = args[0];
    if (!userId) return message.reply("⚠️ Provide a valid user ID.");

    try {
      await message.guild.members.unban(userId);
      const embed = new EmbedBuilder()
        .setColor("#3498db")
        .setTitle("🕊️ User Unbanned")
        .setDescription(`User with ID **${userId}** has been unbanned.`)
        .setFooter({ text: `Action by ${message.author.tag}` });

      message.channel.send({ embeds: [embed] });
    } catch {
      message.reply("❌ Could not unban that user. Check the ID.");
    }
  },
};