const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Show the richest users on Hellz 💰"),

  async execute(interaction) {
    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    const data = JSON.parse(fs.readFileSync(coinsPath, "utf8"));

    const sorted = Object.entries(data)
      .sort((a, b) => b[1].coins - a[1].coins)
      .slice(0, 10);

    const desc =
      sorted.length > 0
        ? sorted
            .map(
              ([id, info], i) =>
                `**${i + 1}.** <@${id}> — ${info.coins.toLocaleString()} coins`
            )
            .join("\n")
        : "No players yet.";

    const embed = new EmbedBuilder()
      .setColor("Gold")
      .setTitle("🏆 Hellz Leaderboard")
      .setDescription(desc)
      .setFooter({ text: "Top 10 richest users" });

    await interaction.reply({ embeds: [embed] });
  },
};