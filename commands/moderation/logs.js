const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("logs")
    .setDescription("Show recent server logs (joins, leaves, bans, etc.)")
    .setDMPermission(false),

  async execute(interaction) {
    const logs = interaction.guild.channels.cache.find(
      (ch) => ch.name.includes("logs") && ch.isTextBased()
    );

    if (!logs)
      return interaction.reply({
        content: "⚠️ No logs channel found. Create one named `logs`.",
        ephemeral: true,
      });

    const messages = await logs.messages.fetch({ limit: 10 }).catch(() => null);
    if (!messages?.size)
      return interaction.reply({ content: "No recent logs found.", ephemeral: true });

    const logList = [...messages.values()]
      .slice(0, 10)
      .map((m) => `• ${m.author.tag}: ${m.content}`)
      .join("\n");

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("🗂️ Recent Server Logs")
      .setDescription(logList || "No logs available.")
      .setFooter({ text: "Hellz V3 System" });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};