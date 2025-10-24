const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("Set the channel slowmode duration.")
    .addIntegerOption((option) =>
      option
        .setName("seconds")
        .setDescription("Slowmode duration in seconds (0 to disable)")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setDMPermission(false),

  async execute(interaction) {
    const seconds = interaction.options.getInteger("seconds");
    const channel = interaction.channel;

    if (seconds < 0 || seconds > 21600)
      return interaction.reply({
        content: "❌ Slowmode must be between 0 and 21600 seconds (6h max).",
        ephemeral: true,
      });

    try {
      await channel.setRateLimitPerUser(seconds);
      await interaction.reply({
        content:
          seconds === 0
            ? "⏩ Slowmode disabled for this channel."
            : `🐢 Slowmode set to **${seconds}s** for this channel.`,
      });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: "Failed to set slowmode.", ephemeral: true });
    }
  },
};