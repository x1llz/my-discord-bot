const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roleinfo")
    .setDescription("Show information about a role")
    .addRoleOption(opt =>
      opt.setName("role").setDescription("Role to view").setRequired(true)
    ),

  async execute(interaction) {
    const role = interaction.options.getRole("role");

    const embed = new EmbedBuilder()
      .setColor(role.color || "#00BFFF")
      .setTitle(`🎭 Role Info: ${role.name}`)
      .addFields(
        { name: "🆔 ID", value: role.id, inline: true },
        { name: "📅 Created", value: `<t:${Math.floor(role.createdTimestamp / 1000)}:R>`, inline: true },
        { name: "👥 Members", value: `${role.members.size}`, inline: true },
        { name: "🔒 Mentionable", value: role.mentionable ? "Yes" : "No", inline: true },
        { name: "📈 Position", value: `${role.position}`, inline: true }
      )
      .setFooter({ text: `Requested by ${interaction.user.tag}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
