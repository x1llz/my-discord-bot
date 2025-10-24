const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("beg")
    .setDescription("Beg for coins 💀 (low chance, low reward)"),

  async execute(interaction) {
    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    const data = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const userId = interaction.user.id;

    if (!data[userId]) data[userId] = { coins: 0, lastBeg: 0 };

    const now = Date.now();
    const cooldown = 300000; // 5 minutes
    const diff = now - data[userId].lastBeg;

    if (diff < cooldown)
      return interaction.reply({
        content: "⏳ Chill bro, wait before begging again.",
        ephemeral: true,
      });

    const success = Math.random() < 0.75;
    let amount = 0;
    let msg = "";

    if (success) {
      amount = Math.floor(Math.random() * 120) + 20;
      data[userId].coins += amount;
      msg = `💰 Someone felt pity and gave you **${amount} coins.**`;
    } else {
      msg = "💀 Nobody cared. You got nothing.";
    }

    data[userId].lastBeg = now;
    fs.writeFileSync(coinsPath, JSON.stringify(data, null, 2));

    await interaction.reply({ content: msg });
  },
};