const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Remove timeout (unmute) from a user.")
    .addUserOption((option) =>
      option.setName("target").setDescription("Select a user to unmute").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false),

  async execute(interaction) {
    const user = interaction.options.getUser("target");
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);

    if (!member)
      return interaction.reply({ content: "User not found.", ephemeral: true });

    try {
      await member.timeout(null);
      await interaction.reply({ content: `🔊 **${user.tag}** has been unmuted.` });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: "Couldn't unmute this user.", ephemeral: true });
    }
  },
};