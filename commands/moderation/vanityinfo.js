const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const vanityFile = path.join(__dirname, "../../data/vanity.json");

if (!fs.existsSync(vanityFile)) fs.writeFileSync(vanityFile, JSON.stringify({}));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vanityinfo")
    .setDescription("Show the current vanity system configuration"),

  async execute(interaction) {
    const vanityData = JSON.parse(fs.readFileSync(vanityFile));
    const config = vanityData[interaction.guild.id];

    if (!config)
      return interaction.reply({ content: "❌ No vanity system is currently set.", ephemeral: true });

    const embed = new EmbedBuilder()
      .setColor("#00BFFF")
      .setTitle("📘 Vanity Configuration")
      .addFields(
        { name: "🔑 Keyword", value: `\`${config.keyword}\``, inline: true },
        { name: "🎭 Role", value: `<@&${config.roleId}>`, inline: true },
        { name: "💬 Channel", value: `<#${config.channelId}>`, inline: true },
        { name: "📝 Message", value: `\`${config.message}\``, inline: false },
      )
      .setFooter({ text: `Requested by ${interaction.user.tag}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
