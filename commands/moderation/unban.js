import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

export default {
  name: "unban",
  description: "Unban a user by ID",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.BanMembers))
      return message.reply("❌ You don't have permission to unban members.");

    const id = args[0];
    if (!id) return message.reply("⚠️ Provide a user ID to unban.");

    try {
      await message.guild.members.unban(id);
      const embed = new EmbedBuilder()
        .setColor("#2ecc71")
        .setTitle("🕊️ User Unbanned")
        .setDescription(`User with ID **${id}** has been unbanned.`)
        .setFooter({ text: `By ${message.author.tag}` });
      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      return message.reply("❌ Could not unban that user. Check the ID and permissions.");
    }
  },
};