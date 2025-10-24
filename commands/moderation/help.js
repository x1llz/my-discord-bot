const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show how to get help or visit our website.")
    .setDMPermission(true),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("❓ Hellz Help")
      .setDescription(
        "Need help? Visit our website for tutorials, commands, and updates.\n\n[Go to Hellz Market](https://hellz-market.mysellauth.com)"
      )
      .setFooter({ text: "Hellz V3 Support" });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};