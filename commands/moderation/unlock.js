const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unlock")
    .setDescription("Unlock the current channel for everyone.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setDMPermission(false),

  async execute(interaction) {
    const channel = interaction.channel;

    try {
      await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
        SendMessages: true,
      });

      await interaction.reply({
        content: `🔓 Channel **${channel.name}** has been unlocked.`,
      });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: "Failed to unlock this channel.", ephemeral: true });
    }
  },
};