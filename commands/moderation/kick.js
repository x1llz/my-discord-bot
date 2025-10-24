const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a member from the server.")
    .addUserOption((option) =>
      option.setName("target").setDescription("Select a user to kick").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason for the kick").setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setDMPermission(false),

  async execute(interaction) {
    const user = interaction.options.getUser("target");
    const reason = interaction.options.getString("reason") || "No reason provided.";

    const member = await interaction.guild.members.fetch(user.id).catch(() => null);
    if (!member)
      return interaction.reply({ content: "User not found.", ephemeral: true });

    if (!member.kickable)
      return interaction.reply({ content: "I can't kick this user.", ephemeral: true });

    try {
      await member.kick(reason);
      await interaction.reply({
        content: `👢 **${user.tag}** has been kicked.\nReason: ${reason}`,
      });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: "Couldn't kick this user.", ephemeral: true });
    }
  },
};