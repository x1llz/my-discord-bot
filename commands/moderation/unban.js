const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a user by their ID.")
    .addStringOption((option) =>
      option
        .setName("userid")
        .setDescription("The ID of the user to unban")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),

  async execute(interaction) {
    const userId = interaction.options.getString("userid");

    try {
      await interaction.guild.bans.remove(userId);
      await interaction.reply({
        content: `✅ Successfully unbanned <@${userId}>.`,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content:
          "❌ Couldn't unban this user. Make sure the ID is valid and the user is banned.",
        ephemeral: true,
      });
    }
  },
};