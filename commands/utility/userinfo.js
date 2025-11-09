const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Display information about a user")
    .addUserOption(opt =>
      opt.setName("user").setDescription("User to view").setRequired(false)
    ),

  async execute(interaction) {
    const member = interaction.options.getMember("user") || interaction.member;
    const roles = member.roles.cache
      .filter(r => r.id !== interaction.guild.id)
      .map(r => r.toString())
      .join(", ") || "No roles";

    const embed = new EmbedBuilder()
      .setColor("#00BFFF")
      .setTitle(`👤 User Info: ${member.user.tag}`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: "🆔 ID", value: member.id, inline: true },
        { name: "📅 Joined Server", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
        { name: "📅 Joined Discord", value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`, inline: true },
        { name: "🎭 Roles", value: roles, inline: false }
      )
      .setFooter({ text: `Requested by ${interaction.user.tag}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
