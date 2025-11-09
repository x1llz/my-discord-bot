// commands/moderation/slowmode.js
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("Set a slowmode in this channel")
    .addIntegerOption(opt =>
      opt.setName("seconds").setDescription("Delay in seconds (0 = disable)").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const seconds = interaction.options.getInteger("seconds");
    if (seconds < 0 || seconds > 21600)
      return interaction.reply({ content: "❌ Value must be between 0 and 21600 seconds.", ephemeral: true });

    await interaction.channel.setRateLimitPerUser(seconds);
    await interaction.reply({
      content:
        seconds === 0
          ? "⏱️ Slowmode disabled."
          : `🐢 Slowmode set to **${seconds}s** in ${interaction.channel}.`,
      ephemeral: false,
    });
  },
};
