const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hunt")
    .setDescription("Go hunting for rewards 🏹"),

  async execute(interaction) {
    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    const data = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const userId = interaction.user.id;
    if (!data[userId]) data[userId] = { coins: 0, lastHunt: 0 };

    const now = Date.now();
    const cooldown = 600000; // 10 min
    const diff = now - data[userId].lastHunt;
    if (diff < cooldown)
      return interaction.reply({
        content: "🏹 You need to reload. Try again later.",
        ephemeral: true,
      });

    const animals = [
      { name: "🐇 Rabbit", value: 200 },
      { name: "🦌 Deer", value: 400 },
      { name: "🐻 Bear", value: 800 },
      { name: "🐦 Bird", value: 100 },
      { name: "🐗 Boar", value: 350 },
      { name: "🐍 Snake", value: 150 },
    ];
    const hunted = animals[Math.floor(Math.random() * animals.length)];
    const bonus = Math.random() < 0.05 ? 1000 : 0;
    const reward = hunted.value + bonus;

    data[userId].coins += reward;
    data[userId].lastHunt = now;
    fs.writeFileSync(coinsPath, JSON.stringify(data, null, 2));

    const embed = new EmbedBuilder()
      .setColor("Brown")
      .setTitle("🏹 Hunting Results")
      .setDescription(
        bonus
          ? `🎉 You hunted a **${hunted.name}** and found a hidden treasure worth **${reward} coins!**`
          : `You hunted a **${hunted.name}** worth **${hunted.value} coins.**`
      );

    await interaction.reply({ embeds: [embed] });
  },
};