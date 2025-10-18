import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

export default {
  name: "ban",
  description: "Ban a user from the server 🔨",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.BanMembers))
      return message.reply("❌ You don’t have permission to ban members.");

    const member = message.mentions.members.first();
    if (!member) return message.reply("⚠️ Mention a user to ban.");

    const reason = args.slice(1).join(" ") || "No reason provided.";
    await member.ban({ reason });

    const embed = new EmbedBuilder()
      .setColor("#e74c3c")
      .setTitle("🚫 User Banned")
      .setDescription(`**${member.user.tag}** has been banned.\n> Reason: ${reason}`)
      .setFooter({ text: `By ${message.author.tag}` });

    message.channel.send({ embeds: [embed] });
  },
};