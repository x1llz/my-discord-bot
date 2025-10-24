const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const profilePath = path.join(__dirname, "../../data/profile.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("topxp")
    .setDescription("Show the XP leaderboard 🧠"),

  async execute(interaction) {
    if (!fs.existsSync(profilePath)) fs.writeFileSync(profilePath, JSON.stringify({}));
    const profiles = JSON.parse(fs.readFileSync(profilePath, "utf8"));

    const sorted = Object.entries(profiles)
      .sort((a, b) => b[1].xp - a[1].xp)
      .slice(0, 10);

    const desc =
      sorted.length > 0
        ? sorted
            .map(
              ([id, p], i) =>
                `**${i + 1}.** <@${id}> — LVL ${p.level} (${p.xp} XP) | Prestige ${p.prestige}`
            )
            .join("\n")
        : "No XP data yet.";

    const embed = new EmbedBuilder()
      .setColor("Gold")
      .setTitle("🏆 XP Leaderboard")
      .setDescription(desc)
      .setFooter({ text: "Top 10 users by XP" });

    await interaction.reply({ embeds: [embed] });
  },
};