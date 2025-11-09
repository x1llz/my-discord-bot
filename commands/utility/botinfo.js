const { SlashCommandBuilder, EmbedBuilder, version } = require("discord.js");
const os = require("os");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Display information about the bot"),

  async execute(interaction) {
    const uptime = Math.floor(process.uptime());
    const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    const usedMem = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);

    const embed = new EmbedBuilder()
      .setColor("#00BFFF")
      .setTitle("🤖 Hellz Bot Info")
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .addFields(
        { name: "🆔 Bot", value: interaction.client.user.tag, inline: true },
        { name: "📚 Library", value: `discord.js v${version}`, inline: true },
        { name: "💾 Memory", value: `${usedMem}MB / ${totalMem}GB`, inline: true },
        { name: "🌐 Servers", value: `${interaction.client.guilds.cache.size}`, inline: true },
        { name: "👥 Users", value: `${interaction.client.users.cache.size}`, inline: true },
        { name: "🕒 Uptime", value: `${Math.floor(uptime / 60)} mins`, inline: true }
      )
      .setFooter({ text: "Hellz System", iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
