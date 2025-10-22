import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

export default {
  name: "logs",
  description: "Show the latest moderation logs 📜",
  async execute(message) {
    try {
      // check perms
      if (!message.member.permissions.has(PermissionFlagsBits.ViewAuditLog))
        return message.reply("❌ You don't have permission to view audit logs.");

      const fetchedLogs = await message.guild.fetchAuditLogs({ limit: 10 });
      const entries = fetchedLogs.entries.map((e) => ({
        action: e.actionType,
        target: e.target?.tag || e.target?.name || "Unknown",
        executor: e.executor?.tag || "Unknown",
        reason: e.reason || "No reason provided",
        time: `<t:${Math.floor(e.createdTimestamp / 1000)}:R>`,
      }));

      const description =
        entries.length > 0
          ? entries
              .map(
                (e, i) =>
                  `**#${i + 1}** — 🕒 ${e.time}\n**Action:** ${e.action}\n**User:** ${e.target}\n**By:** ${e.executor}\n**Reason:** ${e.reason}\n`
              )
              .join("\n──────────────\n")
          : "No recent moderation actions found.";

      const embed = new EmbedBuilder()
        .setColor("#2b2d31")
        .setTitle("📜 Server Audit Logs")
        .setDescription(description)
        .setFooter({
          text: `Requested by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL(),
        })
        .setTimestamp();

      await message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error("Error in +logs command:", err);
      message.reply("⚠️ Couldn't fetch audit logs. Check my permissions.");
    }
  },
};