const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Delete a number of messages in this channel (max 200).")
    .addIntegerOption((option) =>
      option.setName("amount").setDescription("Number of messages to delete").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false),

  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");

    if (amount < 1 || amount > 200)
      return interaction.reply({
        content: "⚠️ You can only delete between 1 and 200 messages.",
        ephemeral: true,
      });

    await interaction.deferReply({ ephemeral: true });

    try {
      const messages = await interaction.channel.bulkDelete(amount, true);
      await interaction.editReply({
        content: `🧹 Successfully deleted **${messages.size}** messages.`,
      });
    } catch (err) {
      console.error(err);
      await interaction.editReply({
        content: "❌ Failed to delete messages. They might be too old (14+ days).",
      });
    }

    // Add cooldown (30 seconds)
    const userCooldown = new Map();
    if (userCooldown.has(interaction.user.id))
      return interaction.editReply({ content: "Please wait 30 seconds before using /purge again." });

    userCooldown.set(interaction.user.id, Date.now());
    setTimeout(() => userCooldown.delete(interaction.user.id), 30000);
  },
};