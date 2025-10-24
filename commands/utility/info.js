const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const os = require("os");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Display bot or server information.")
    .addSubcommand(sub =>
      sub.setName("bot").setDescription("Show information about the bot.")
    )
    .addSubcommand(sub =>
      sub.setName("server").setDescription("Show information about this server.")
    )
    .setDMPermission(false),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();

    // === /info bot ===
    if (sub === "bot") {
      const uptime = process.uptime();
      const totalSeconds = Math.floor(uptime);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const embed = new EmbedBuilder()
        .setColor("Aqua")
        .setTitle("🤖 Hellz Bot Information")
        .setThumbnail(interaction.client.user.displayAvatarURL())
        .addFields(
          { name: "Name", value: interaction.client.user.username, inline: true },
          { name: "Servers", value: `${interaction.client.guilds.cache.size}`, inline: true },
          { name: "Users", value: `${interaction.client.users.cache.size}`, inline: true },
          {
            name: "Uptime",
            value: `${hours}h ${minutes}m ${seconds}s`,
            inline: true,
          },
          { name: "Node Version", value: process.version, inline: true },
          { name: "Platform", value: os.type(), inline: true }
        )
        .setFooter({ text: "Hellz Bot V3" })
        .setTimestamp();

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    // === /info server ===
    if (sub === "server") {
      const guild = interaction.guild;
      const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle(`📊 Server Information — ${guild.name}`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addFields(
          { name: "Server ID", value: guild.id, inline: true },
          { name: "Owner", value: `<@${guild.ownerId}>`, inline: true },
          { name: "Members", value: `${guild.memberCount}`, inline: true },
          { name: "Created", value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
          { name: "Boosts", value: `${guild.premiumSubscriptionCount}`, inline: true },
          { name: "Roles", value: `${guild.roles.cache.size}`, inline: true }
        )
        .setFooter({ text: "Hellz Server Stats" })
        .setTimestamp();

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};