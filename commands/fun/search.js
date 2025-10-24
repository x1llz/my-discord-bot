const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("search")
    .setDescription("Search random places for coins 🔍"),

  async execute(interaction) {
    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    const data = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const userId = interaction.user.id;
    if (!data[userId]) data[userId] = { coins: 0, lastSearch: 0 };

    const now = Date.now();
    const cooldown = 300000; // 5 min
    const diff = now - data[userId].lastSearch;
    if (diff < cooldown)
      return interaction.reply({
        content: "🔍 You already searched recently, wait a bit.",
        ephemeral: true,
      });

    const places = [
      "the beach 🏖️",
      "an abandoned house 🏚️",
      "a trash bin 🗑️",
      "a forest 🌲",
      "a cave 🕳️",
      "the street corner 🚧",
      "your DMs 💬",
      "a hidden chest 🧰",
    ];
    const found = places[Math.floor(Math.random() * places.length)];
    const success = Math.random() < 0.7;
    let msg;

    if (success) {
      const amount = Math.floor(Math.random() * 300) + 50;
      data[userId].coins += amount;
      msg = `🔍 You searched **${found}** and found **${amount} coins!**`;
    } else {
      msg = `😢 You searched **${found}** but found nothing.`;
    }

    data[userId].lastSearch = now;
    fs.writeFileSync(coinsPath, JSON.stringify(data, null, 2));

    await interaction.reply({ content: msg });
  },
};