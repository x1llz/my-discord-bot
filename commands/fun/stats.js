const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const profilePath = path.join(__dirname, "../../data/profile.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Show your XP, level, and progress 📈")
    .addUserOption((opt) =>
      opt.setName("user").setDescription("User to check").setRequired(false)
    ),

  async execute(interaction) {
    if (!fs.existsSync(profilePath)) fs.writeFileSync(profilePath, JSON.stringify({}));
    const profiles = JSON.parse(fs.readFileSync(profilePath, "utf8"));
    const user = interaction.options.getUser("user") || interaction.user;

    if (!profiles[user.id])
      profiles[user.id] = { xp: 0, level: 1, prestige: 0 };

    const { xp, level, prestige } = profiles[user.id];
    const nextXP = level * 100 + prestige * 25;

    const embed = new EmbedBuilder()
      .setColor("Aqua")
      .setTitle(`📈 ${user.username}'s Stats`)
      .setDescription(
        `Level: **${level}**\nXP: **${xp}/${nextXP}**\nPrestige: **${prestige}**`
      );

    await interaction.reply({ embeds: [embed], ephemeral: false });
  },
};