const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("role-all")
    .setDescription("Add a role to everyone in the server")
    .addRoleOption(opt =>
      opt.setName("role").setDescription("Role to add to all members").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const role = interaction.options.getRole("role");
    await interaction.reply({ content: `⚙️ Adding ${role} to everyone...`, ephemeral: true });

    let success = 0;
    const members = await interaction.guild.members.fetch();

    for (const member of members.values()) {
      if (!member.user.bot && !member.roles.cache.has(role.id)) {
        await member.roles.add(role).catch(() => {});
        success++;
      }
    }

    await interaction.followUp({
      content: `✅ Role ${role} added to **${success}** members.`,
      ephemeral: false,
    });
  },
};
