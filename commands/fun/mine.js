const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mine")
    .setDescription("Mine for valuable resources ⛏️"),

  async execute(interaction) {
    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    const data = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const userId = interaction.user.id;
    if (!data[userId]) data[userId] = { coins: 0, lastMine: 0 };

    const now = Date.now();
    const cooldown = 600000; // 10 min
    const diff = now - data[userId].lastMine;
    if (diff < cooldown)
      return interaction.reply({
        content: "⛏️ Your pickaxe is cooling down.",
        ephemeral: true,
      });

    const ores = [
      { name: "🪨 Stone", value: 100 },
      { name: "⛓️ Iron", value: 250 },
      { name: "💎 Diamond", value: 700 },
      { name: "🥇 Gold", value: 400 },
      { name: "🧱 Coal", value: 150 },
      { name: "🪙 Platinum", value: 900 },
    ];
    const mined = ores[Math.floor(Math.random() * ores.length)];
    const bonus = Math.random() < 0.05 ? 1000 : 0;
    const reward = mined.value + bonus;

    data[userId].coins += reward;
    data[userId].lastMine = now;
    fs.writeFileSync(coinsPath, JSON.stringify(data, null, 2));

    const embed = new EmbedBuilder()
      .setColor("Grey")
      .setTitle("⛏️ Mining Results")
      .setDescription(
        bonus
          ? `💎 You found a **${mined.name}** and hit a rare vein worth **${reward} coins!**`
          : `You mined **${mined.name}** worth **${mined.value} coins.**`
      );

    await interaction.reply({ embeds: [embed] });
  },
};