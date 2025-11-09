// commands/moderation/ban.js
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user from the server")
    .addUserOption(opt =>
      opt.setName("user").setDescription("User to ban").setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName("reason").setDescription("Reason for the ban").setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason") || "No reason provided";

    const member = await interaction.guild.members.fetch(user.id).catch(() => null);
    if (!member) return interaction.reply({ content: "❌ User not found on this server.", ephemeral: true });

    if (!member.bannable)
      return interaction.reply({ content: "❌ I can’t ban this user.", ephemeral: true });

    await member.ban({ reason });
    await interaction.reply({
      content: `✅ ${user.tag} has been banned.\n**Reason:** ${reason}`,
      ephemeral: false,
    });
  },
};
