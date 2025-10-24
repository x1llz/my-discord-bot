const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fish")
    .setDescription("Go fishing for coins 🎣"),

  async execute(interaction) {
    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    const data = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const userId = interaction.user.id;

    if (!data[userId]) data[userId] = { coins: 0, lastFish: 0 };

    const now = Date.now();
    const cooldown = 600000; // 10 minutes
    const diff = now - data[userId].lastFish;

    if (diff < cooldown)
      return interaction.reply({
        content: "🐟 Chill fisherman, wait before fishing again.",
        ephemeral: true,
      });

    const fishes = [
      { name: "🐠 Small Fish", value: 100 },
      { name: "🐡 Pufferfish", value: 250 },
      { name: "🦈 Shark", value: 600 },
      { name: "🐋 Whale", value: 1000 },
      { name: "🪸 Coral Piece", value: 150 },
      { name: "🦑 Squid", value: 350 },
    ];

    const fish = fishes[Math.floor(Math.random() * fishes.length)];
    const bonus = Math.random() < 0.05 ? 1000 : 0;
    const reward = fish.value + bonus;

    data[userId].coins += reward;
    data[userId].lastFish = now;
    fs.writeFileSync(coinsPath, JSON.stringify(data, null, 2));

    const embed = new EmbedBuilder()
      .setColor("Aqua")
      .setTitle("🎣 Fishing Results")
      .setDescription(
        bonus
          ? `🎉 You caught a **${fish.name}** and found a rare pearl worth **${reward} coins!**`
          : `You caught a **${fish.name}** worth **${fish.value} coins!**`
      );

    await interaction.reply({ embeds: [embed] });
  },
};