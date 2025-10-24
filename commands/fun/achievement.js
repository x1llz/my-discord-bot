const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const profilePath = path.join(__dirname, "../../data/profile.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("achievement")
    .setDescription("Show your achievements 🏆"),

  async execute(interaction) {
    if (!fs.existsSync(profilePath)) fs.writeFileSync(profilePath, JSON.stringify({}));
    const data = JSON.parse(fs.readFileSync(profilePath, "utf8"));
    const userId = interaction.user.id;
    const profile = data[userId] || { xp: 0, level: 1, prestige: 0 };

    const achievements = [];
    if (profile.level >= 10) achievements.push("⭐ **Reached Level 10**");
    if (profile.level >= 50) achievements.push("🔥 **Reached Level 50**");
    if (profile.prestige >= 1) achievements.push("🏆 **Prestiged**");
    if (profile.xp >= 10000) achievements.push("💎 **10K XP Milestone**");

    const embed = new EmbedBuilder()
      .setColor("Gold")
      .setTitle(`🏅 ${interaction.user.username}'s Achievements`)
      .setDescription(achievements.length > 0 ? achievements.join("\n") : "No achievements yet.");

    await interaction.reply({ embeds: [embed] });
  },
};