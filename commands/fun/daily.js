const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Claim your daily coins 💰"),

  async execute(interaction) {
    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));

    const data = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const userId = interaction.user.id;
    const now = Date.now();

    if (!data[userId]) data[userId] = { coins: 0, lastDaily: 0 };

    const diff = now - data[userId].lastDaily;
    if (diff < 86400000)
      return interaction.reply({
        content: "⏳ You already claimed your daily coins. Try again later.",
        ephemeral: true,
      });

    const reward = Math.floor(Math.random() * 300) + 100; // 100–400 coins
    data[userId].coins += reward;
    data[userId].lastDaily = now;

    fs.writeFileSync(coinsPath, JSON.stringify(data, null, 2));

    await interaction.reply({
      content: `🎉 You received **${reward} coins**! You now have **${data[userId].coins} coins.**`,
    });
  },
};