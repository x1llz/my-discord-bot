import { EmbedBuilder, PermissionFlagsBits } from "discord.js";
import ms from "ms";

export default {
  name: "mute",
  description: "Mute (timeout) a user ⛔",
  async execute(message, args) {
    // Check for permission
    if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      return message.reply("❌ You don’t have permission to timeout members.");
    }

    const member = message.mentions.members.first();
    if (!member) return message.reply("⚠️ Mention a user to mute.");

    const timeArg = args[1] || "10m";
    const duration = ms(timeArg);
    if (!duration || duration < 10000) {
      return message.reply("⏰ Invalid time format (min 10s). Example: `+mute @user 10m reason`");
    }

    const reason = args.slice(2).join(" ") || "No reason provided";

    try {
      // Prevent muting admins or self
      if (member.id === message.author.id) return message.reply("😅 You can’t mute yourself!");
      if (member.roles.highest.position >= message.member.roles.highest.position)
        return message.reply("🚫 You can’t mute someone with an equal or higher role.");

      // Apply timeout
      await member.timeout(duration, reason);

      const embed = new EmbedBuilder()
        .setColor("#3498db")
        .setTitle("🔇 User Muted")
        .setDescription(`**${member.user.tag}** has been muted for **${timeArg}**\n> 📝 Reason: ${reason}`)
        .setFooter({ text: `Action by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
        .setTimestamp();

      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply("⚠️ Failed to mute the user. Make sure I have the **Moderate Members** permission.");
    }
  },
};