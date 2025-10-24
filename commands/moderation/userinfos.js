const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const os = require("os");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Show Hellz bot statistics.")
    .setDMPermission(true),

  async execute(interaction) {
    const totalSeconds = Math.floor(process.uptime());
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const uptime = `${hours}h ${minutes}m ${seconds}s`;

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("📊 Hellz Bot Statistics")
      .addFields(
        { name: "Servers", value: `${interaction.client.guilds.cache.size}`, inline: true },
        { name: "Users", value: `${interaction.client.users.cache.size}`, inline: true },
        { name: "Ping", value: `${interaction.client.ws.ping}ms`, inline: true },
        { name: "Uptime", value: uptime, inline: true },
        { name: "Platform", value: os.platform(), inline: true },
        { name: "Memory", value: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`, inline: true }
      )
      .setFooter({ text: "Hellz V3 System" });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};