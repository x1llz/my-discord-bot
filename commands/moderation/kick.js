// commands/moderation/kick.js
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a user from the server")
    .addUserOption(opt =>
      opt.setName("user").setDescription("User to kick").setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName("reason").setDescription("Reason for the kick").setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason") || "No reason provided";

    const member = await interaction.guild.members.fetch(user.id).catch(() => null);
    if (!member)
      return interaction.reply({ content: "❌ User not found on this server.", ephemeral: true });

    if (!member.kickable)
      return interaction.reply({ content: "❌ I can’t kick this user.", ephemeral: true });

    await member.kick(reason);

    await interaction.reply({
      content: `✅ ${user.tag} has been kicked.\n**Reason:** ${reason}`,
      ephemeral: false,
    });
  },
};
