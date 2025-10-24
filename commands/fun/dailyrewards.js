const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dailyreward")
    .setDescription("Claim your daily reward 💰"),

  async execute(interaction) {
    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    const data = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const userId = interaction.user.id;

    if (!data[userId]) data[userId] = { coins: 0, lastDaily: 0 };

    const now = Date.now();
    const cooldown = 86400000; // 24h
    const diff = now - data[userId].lastDaily;

    if (diff < cooldown) {
      const hoursLeft = Math.ceil((cooldown - diff) / (1000 * 60 * 60));
      return interaction.reply({ content: `⏳ Come back in **${hoursLeft}h** for your next reward.`, ephemeral: true });
    }

    const reward = Math.floor(Math.random() * 1000) + 500;
    data[userId].coins += reward;
    data[userId].lastDaily = now;
    fs.writeFileSync(coinsPath, JSON.stringify(data, null, 2));

    await interaction.reply({ content: `🎁 You claimed your daily reward: **${reward} coins!**` });
  },
};