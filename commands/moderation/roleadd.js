const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("role-add")
    .setDescription("Add a role to a member")
    .addUserOption(opt =>
      opt.setName("user").setDescription("User to give the role").setRequired(true)
    )
    .addRoleOption(opt =>
      opt.setName("role").setDescription("Role to give").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    const user = interaction.options.getMember("user");
    const role = interaction.options.getRole("role");

    if (!user.manageable)
      return interaction.reply({ content: "❌ I can’t manage this user.", ephemeral: true });

    if (user.roles.cache.has(role.id))
      return interaction.reply({ content: "⚠️ User already has that role.", ephemeral: true });

    await user.roles.add(role).catch(() => null);
    await interaction.reply({ content: `✅ Added ${role} to ${user}.`, ephemeral: false });
  },
};
