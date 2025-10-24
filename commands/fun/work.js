const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("work")
    .setDescription("Work and earn coins 💼"),

  async execute(interaction) {
    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    const data = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const userId = interaction.user.id;

    if (!data[userId]) data[userId] = { coins: 0, lastWork: 0 };

    const now = Date.now();
    const cooldown = 3600000; // 1 hour cooldown
    const diff = now - data[userId].lastWork;

    if (diff < cooldown) {
      const minutes = Math.floor((cooldown - diff) / 60000);
      return interaction.reply({
        content: `⏳ You’re tired. Try working again in ${minutes} minutes.`,
        ephemeral: true,
      });
    }

    const jobs = [
      "Developer 👨‍💻",
      "Streamer 🎮",
      "Waiter 🍽️",
      "Cashier 💵",
      "Reseller 📦",
      "Barista ☕",
      "Taxi driver 🚕",
      "YouTuber 📹",
      "Designer 🎨",
    ];
    const job = jobs[Math.floor(Math.random() * jobs.length)];
    const earned = Math.floor(Math.random() * 400) + 150;

    data[userId].coins += earned;
    data[userId].lastWork = now;

    fs.writeFileSync(coinsPath, JSON.stringify(data, null, 2));

    await interaction.reply({
      content: `💼 You worked as a **${job}** and earned **${earned} coins!**`,
    });
  },
};