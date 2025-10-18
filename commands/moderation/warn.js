import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

export default {
  name: "warn",
  description: "Warn a member 🚨",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers))
      return message.reply("❌ You don’t have permission to warn members.");

    const member = message.mentions.members.first();
    if (!member) return message.reply("⚠️ Mention a user to warn.");
    const reason = args.slice(1).join(" ") || "No reason provided.";

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("⚠️ Member Warned")
      .setDescription(`**${member.user.tag}** has been warned.\n> Reason: ${reason}`)
      .setFooter({ text: `By ${message.author.tag}` });

    message.channel.send({ embeds: [embed] });
  },
};