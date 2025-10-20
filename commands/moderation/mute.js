import { EmbedBuilder, PermissionFlagsBits } from "discord.js";
import ms from "ms";

export default {
  name: "mute",
  description: "Mute a user (timeout) ⛔",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers))
      return message.reply("❌ You don’t have permission to mute members.");

    const member = message.mentions.members.first();
    if (!member) return message.reply("⚠️ Mention a user to mute.");

    const time = args[1] || "10m";
    const duration = ms(time);
    if (!duration)
      return message.reply("⏰ Invalid time format. Example: 10m, 1h, 1d");

    const reason = args.slice(2).join(" ") || "No reason provided";
    await member.timeout(duration, reason).catch(() => {
      return message.reply("❌ I couldn’t timeout this user.");
    });

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🔇 User Muted")
      .setDescription(`**${member.user.tag}** has been muted for ${time}\n> Reason: ${reason}`)
      .setFooter({ text: `Action by ${message.author.tag}` });

    message.channel.send({ embeds: [embed] });
  },
};