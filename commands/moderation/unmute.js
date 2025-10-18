import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

export default {
  name: "unmute",
  description: "Remove a timeout (unmute) from a member",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers))
      return message.reply("❌ You don't have permission to unmute members.");

    const member = message.mentions.members.first();
    if (!member) return message.reply("⚠️ Mention a member to unmute.");

    try {
      await member.timeout(null);
      const embed = new EmbedBuilder()
        .setColor("#2ecc71")
        .setTitle("🔈 User Unmuted")
        .setDescription(`**${member.user.tag}** has been unmuted.`)
        .setFooter({ text: `By ${message.author.tag}` });
      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      return message.reply("❌ Failed to unmute the user.");
    }
  },
};