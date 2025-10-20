import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

export default {
  name: "logs",
  description: "View the most recent moderation actions (audit logs).",
  async execute(message) {
    // Permission check
    if (!message.member.permissions.has(PermissionFlagsBits.ViewAuditLog)) {
      return message.reply("❌ You don't have permission to view audit logs.");
    }

    try {
      const fetchedLogs = await message.guild.fetchAuditLogs({ limit: 10 });
      const entries = fetchedLogs.entries.map(entry => {
        const actionType = entry.actionType || entry.action;
        const target = entry.target?.tag || entry.target?.name || "Unknown";
        const executor = entry.executor?.tag || "Unknown";
        const reason = entry.reason || "No reason provided";

        return `🔹 **Action:** ${actionType}\n👤 **Executor:** ${executor}\n🎯 **Target:** ${target}\n📝 **Reason:** ${reason}`;
      });

      if (entries.length === 0) {
        return message.reply("📭 No recent audit logs found.");
      }

      const embed = new EmbedBuilder()
        .setColor("#3498db")
        .setTitle("🕵️‍♂️ Recent Moderation Logs")
        .setDescription(entries.join("\n\n"))
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
        .setTimestamp();

      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      message.reply("⚠️ Failed to fetch audit logs. Make sure I have the right permissions.");
    }
  },
};