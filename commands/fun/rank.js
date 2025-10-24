const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const profilePath = path.join(__dirname, "../../data/profile.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Check your XP rank 📊")
    .addUserOption((opt) =>
      opt.setName("user").setDescription("Check someone’s rank").setRequired(false)
    ),

  async execute(interaction) {
    if (!fs.existsSync(profilePath)) fs.writeFileSync(profilePath, JSON.stringify({}));
    const profiles = JSON.parse(fs.readFileSync(profilePath, "utf8"));
    const user = interaction.options.getUser("user") || interaction.user;

    const sorted = Object.entries(profiles).sort((a, b) => b[1].xp - a[1].xp);
    const rank = sorted.findIndex(([id]) => id === user.id) + 1;
    const p = profiles[user.id] || { xp: 0, level: 1, prestige: 0 };

    const embed = new EmbedBuilder()
      .setColor("Aqua")
      .setTitle(`🏅 ${user.username}'s Rank`)
      .addFields(
        { name: "Level", value: `${p.level}`, inline: true },
        { name: "XP", value: `${p.xp}`, inline: true },
        { name: "Prestige", value: `${p.prestige}`, inline: true },
        { name: "Rank", value: `#${rank || "N/A"}`, inline: true }
      );

    await interaction.reply({ embeds: [embed] });
  },
};