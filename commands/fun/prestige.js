const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const profilePath = path.join(__dirname, "../../data/profile.json");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("prestige")
    .setDescription("Prestige to reset your stats for rewards 🏆"),

  async execute(interaction) {
    if (!fs.existsSync(profilePath)) fs.writeFileSync(profilePath, JSON.stringify({}));
    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));

    const profiles = JSON.parse(fs.readFileSync(profilePath, "utf8"));
    const coins = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const userId = interaction.user.id;

    if (!profiles[userId])
      profiles[userId] = { xp: 0, level: 1, prestige: 0, bio: "No bio set yet." };
    if (!coins[userId]) coins[userId] = { coins: 0, lastDaily: 0 };

    const p = profiles[userId];

    if (p.level < 50)
      return interaction.reply({
        content: "💀 You must reach level **50** to prestige.",
        ephemeral: true,
      });

    p.level = 1;
    p.xp = 0;
    p.prestige += 1;
    coins[userId].coins += 5000 * p.prestige; // Prestige reward

    fs.writeFileSync(profilePath, JSON.stringify(profiles, null, 2));
    fs.writeFileSync(coinsPath, JSON.stringify(coins, null, 2));

    await interaction.reply({
      content: `🏆 Congrats! You prestiged to **Prestige ${p.prestige}** and received **${5000 * p.prestige} coins!**`,
    });
  },
};