const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("events")
    .setDescription("Check current Hellz events 🎉"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor("Aqua")
      .setTitle("🎉 Hellz Active Events")
      .setDescription(
        "🪙 **Double Coins Weekend** — earn 2x coins on /beg, /fish, /mine\n" +
        "🎯 **XP Rush Event** — 50% more XP gain on all commands\n" +
        "🏆 **Top Player Contest** — top 3 XP users win Nitro boosts!"
      )
      .setFooter({ text: "Events auto-refresh every week." });

    await interaction.reply({ embeds: [embed] });
  },
};