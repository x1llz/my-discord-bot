// commands/moderation/purge.js
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Delete a number of messages from this channel")
    .addIntegerOption(opt =>
      opt.setName("amount").setDescription("Number of messages to delete (1-100)").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");
    if (amount < 1 || amount > 100)
      return interaction.reply({ content: "❌ Enter a number between 1 and 100.", ephemeral: true });

    const deleted = await interaction.channel.bulkDelete(amount, true).catch(() => null);
    if (!deleted) return interaction.reply({ content: "⚠️ Could not delete messages.", ephemeral: true });

    await interaction.reply({ content: `🧹 Deleted **${deleted.size}** messages.`, ephemeral: false });
  },
};
