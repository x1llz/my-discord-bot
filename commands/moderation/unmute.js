// commands/moderation/unmute.js
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Remove timeout from a user")
    .addUserOption(opt =>
      opt.setName("user").setDescription("User to unmute").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);

    if (!member) return interaction.reply({ content: "❌ User not found.", ephemeral: true });
    if (!member.isCommunicationDisabled())
      return interaction.reply({ content: "⚠️ This user is not muted.", ephemeral: true });

    await member.timeout(null);
    await interaction.reply({ content: `🔊 ${user.tag} has been unmuted.`, ephemeral: false });
  },
};
