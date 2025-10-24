const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lock")
    .setDescription("Lock the current channel for everyone.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setDMPermission(false),

  async execute(interaction) {
    const channel = interaction.channel;

    try {
      await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
        SendMessages: false,
      });

      await interaction.reply({
        content: `🔒 Channel **${channel.name}** has been locked.`,
      });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: "Failed to lock this channel.", ephemeral: true });
    }
  },
};