const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");
const toolsPath = path.join(__dirname, "../../data/tools.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userod")
    .setDescription("Use your fishing rod to catch fish 🎣"),

  async execute(interaction) {
    if (!fs.existsSync(toolsPath)) fs.writeFileSync(toolsPath, JSON.stringify({}));
    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));

    const tools = JSON.parse(fs.readFileSync(toolsPath, "utf8"));
    const coins = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const userId = interaction.user.id;

    if (!tools[userId] || !tools[userId].rod)
      return interaction.reply({
        content: "❌ You don’t own a fishing rod.",
        ephemeral: true,
      });

    const tool = tools[userId].rod;
    if (tool.durability <= 0)
      return interaction.reply({
        content: "💀 Your fishing rod is broken. Repair it with `/repair`.",
        ephemeral: true,
      });

    const fishes = [
      { name: "🐠 Fish", value: 100 },
      { name: "🐡 Pufferfish", value: 250 },
      { name: "🦈 Shark", value: 600 },
      { name: "🐋 Whale", value: 1000 },
    ];
    const catchFish = fishes[Math.floor(Math.random() * fishes.length)];
    const bonus = Math.random() < 0.1 ? 500 : 0;
    const reward = catchFish.value + bonus;

    if (!coins[userId]) coins[userId] = { coins: 0, lastDaily: 0 };
    coins[userId].coins += reward;
    tool.durability -= 1;

    fs.writeFileSync(coinsPath, JSON.stringify(coins, null, 2));
    fs.writeFileSync(toolsPath, JSON.stringify(tools, null, 2));

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("🎣 Fishing Results")
      .setDescription(
        bonus
          ? `🐟 You caught a **${catchFish.name}** and found a pearl worth **${reward} coins!**`
          : `You caught a **${catchFish.name}** worth **${catchFish.value} coins.**`
      )
      .setFooter({ text: `Durability left: ${tool.durability}/20` });

    await interaction.reply({ embeds: [embed] });
  },
};