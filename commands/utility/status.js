const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const os = require("os");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Check bot, API, or website status.")
    .addSubcommand(sub =>
      sub.setName("bot").setDescription("Show bot status and uptime.")
    )
    .addSubcommand(sub =>
      sub.setName("api").setDescription("Check Discord API latency.")
    )
    .addSubcommand(sub =>
      sub.setName("website").setDescription("Show Hellz Market website.")
    )
    .setDMPermission(true),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const client = interaction.client;

    // === /status bot ===
    if (sub === "bot") {
      const uptime = process.uptime();
      const totalSeconds = Math.floor(uptime);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("🤖 Hellz Bot Status")
        .setDescription("Bot system and uptime information")
        .addFields(
          { name: "Ping", value: `${client.ws.ping} ms`, inline: true },
          { name: "Uptime", value: `${hours}h ${minutes}m ${seconds}s`, inline: true },
          { name: "Servers", value: `${client.guilds.cache.size}`, inline: true },
          { name: "Users", value: `${client.users.cache.size}`, inline: true },
          { name: "Platform", value: os.type(), inline: true },
          { name: "Node.js", value: process.version, inline: true }
        )
        .setFooter({ text: "Hellz Status" })
        .setTimestamp();

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    // === /status api ===
    if (sub === "api") {
      const before = Date.now();
      await interaction.reply({ content: "🏓 Pinging Discord API...", ephemeral: true });
      const latency = Date.now() - before;
      const embed = new EmbedBuilder()
        .setColor("Yellow")
        .setTitle("🌐 Discord API Latency")
        .addFields(
          { name: "Gateway Ping", value: `${client.ws.ping} ms`, inline: true },
          { name: "Response Time", value: `${latency} ms`, inline: true }
        )
        .setTimestamp();

      return interaction.editReply({ content: "", embeds: [embed] });
    }

    // === /status website ===
    if (sub === "website") {
      const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("🌊 Hellz Market")
        .setDescription(
          "Visit our marketplace to find exclusive items and drops.\n\n" +
          "🔗 [Open Hellz Market](https://hellz-market.mysellauth.com)"
        )
        .setFooter({ text: "Hellz Bot V3" })
        .setTimestamp();

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};