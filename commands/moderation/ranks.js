// commands/utilities/ranks.js
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ranks")
    .setDescription("Show the server's owner, admins, and moderators"),

  async execute(interaction) {
    const guild = interaction.guild;
    await guild.members.fetch();

    const owner = await guild.fetchOwner();
    const adminRoles = guild.roles.cache.filter(r => r.permissions.has("Administrator"));
    const modRoles = guild.roles.cache.filter(
      r => !r.permissions.has("Administrator") && r.permissions.has("ManageMessages")
    );

    const admins = guild.members.cache.filter(m =>
      m.roles.cache.some(r => adminRoles.has(r.id))
    );
    const moderators = guild.members.cache.filter(m =>
      m.roles.cache.some(r => modRoles.has(r.id))
    );

    const embed = new EmbedBuilder()
      .setColor("#00BFFF")
      .setTitle("🏅 Server Ranks")
      .addFields(
        { name: "👑 Owner", value: `${owner.user.tag}`, inline: false },
        { name: "🛡️ Admins", value: admins.size ? admins.map(a => a.user.tag).join("\n") : "None", inline: false },
        { name: "🔧 Moderators", value: moderators.size ? moderators.map(m => m.user.tag).join("\n") : "None", inline: false },
      )
      .setFooter({ text: `${guild.name}`, iconURL: guild.iconURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
