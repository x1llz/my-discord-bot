const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get support or buy premium features"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor("#00BFFF")
      .setTitle("💙 Need Help?")
      .setDescription(
        [
          "﹒⊹﹒ **Join the official [Hellz Discord](https://discord.gg/hellz)** for support, updates and news.",
          "",
          "💎 Want exclusive features? Visit our [Hellz Market](https://hellz-market.mysellauth.com/) to unlock premium commands.",
        ].join("\n")
      )
      .setFooter({ text: "Hellz Support & Premium", iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
