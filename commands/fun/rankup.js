const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const profilePath = path.join(__dirname, "../../data/profile.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rankup")
    .setDescription("Rank up automatically if you have enough XP 📈"),

  async execute(interaction) {
    if (!fs.existsSync(profilePath)) fs.writeFileSync(profilePath, JSON.stringify({}));
    const profiles = JSON.parse(fs.readFileSync(profilePath, "utf8"));
    const userId = interaction.user.id;

    if (!profiles[userId]) profiles[userId] = { xp: 0, level: 1, prestige: 0 };

    const profile = profiles[userId];
    const xpNeeded = profile.level * 100;
    if (profile.xp < xpNeeded)
      return interaction.reply({ content: `❌ You need **${xpNeeded - profile.xp} more XP** to rank up.`, ephemeral: true });

    profile.xp -= xpNeeded;
    profile.level++;
    fs.writeFileSync(profilePath, JSON.stringify(profiles, null, 2));

    await interaction.reply({ content: `🚀 Congrats! You ranked up to **Level ${profile.level}**.` });
  },
};