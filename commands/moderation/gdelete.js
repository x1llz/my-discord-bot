const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gdelete")
    .setDescription("Delete a giveaway message (must be the creator).")
    .addStringOption((opt) =>
      opt.setName("messageid").setDescription("Giveaway message ID").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false),

  async execute(interaction) {
    const messageId = interaction.options.getString("messageid");
    const channel = interaction.channel;

    try {
      const message = await channel.messages.fetch(messageId);

      // only the creator can delete their own giveaway
      if (message.interaction?.user.id !== interaction.user.id) {
        return interaction.reply({
          content: "❌ Only the giveaway creator can delete it.",
          ephemeral: true,
        });
      }

      await message.delete();
      await interaction.reply({
        content: "🗑️ Giveaway deleted successfully.",
        ephemeral: true,
      });
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: "❌ Could not delete giveaway (invalid ID or missing permissions).",
        ephemeral: true,
      });
    }
  },
};