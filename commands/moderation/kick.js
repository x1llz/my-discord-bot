import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

export default {
  name: "kick",
  description: "Kick a user from the server 👢",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.KickMembers))
      return message.reply("❌ You don’t have permission to kick members.");

    const member = message.mentions.members.first();
    if (!member) return message.reply("⚠️ Mention a user to kick.");

    const reason = args.slice(1).join(" ") || "No reason provided.";
    await member.kick(reason);

    const embed = new EmbedBuilder()
      .setColor("#f39c12")
      .setTitle("👢 User Kicked")
      .setDescription(`**${member.user.tag}** has been kicked.\n> Reason: ${reason}`)
      .setFooter({ text: `By ${message.author.tag}` });

    message.channel.send({ embeds: [embed] });
  },
};