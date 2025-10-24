const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");
const toolsPath = path.join(__dirname, "../../data/tools.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("usepickaxe")
    .setDescription("Use your pickaxe to mine ores ⛏️"),

  async execute(interaction) {
    if (!fs.existsSync(toolsPath)) fs.writeFileSync(toolsPath, JSON.stringify({}));
    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));

    const tools = JSON.parse(fs.readFileSync(toolsPath, "utf8"));
    const coins = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const userId = interaction.user.id;

    if (!tools[userId] || !tools[userId].pickaxe)
      return interaction.reply({
        content: "❌ You don’t own a pickaxe.",
        ephemeral: true,
      });

    const tool = tools[userId].pickaxe;
    if (tool.durability <= 0)
      return interaction.reply({
        content: "💀 Your pickaxe is broken. Repair it with `/repair`.",
        ephemeral: true,
      });

    const ores = [
      { name: "🪨 Stone", value: 100 },
      { name: "⛓️ Iron", value: 250 },
      { name: "💎 Diamond", value: 700 },
      { name: "🥇 Gold", value: 400 },
    ];
    const mined = ores[Math.floor(Math.random() * ores.length)];
    const bonus = Math.random() < 0.1 ? 300 : 0;
    const reward = mined.value + bonus;

    if (!coins[userId]) coins[userId] = { coins: 0, lastDaily: 0 };
    coins[userId].coins += reward;
    tool.durability -= 1;

    fs.writeFileSync(coinsPath, JSON.stringify(coins, null, 2));
    fs.writeFileSync(toolsPath, JSON.stringify(tools, null, 2));

    const embed = new EmbedBuilder()
      .setColor("Grey")
      .setTitle("⛏️ Mining Results")
      .setDescription(
        bonus
          ? `💎 You mined **${mined.name}** and found a rare gem worth **${reward} coins!**`
          : `You mined **${mined.name}** and earned **${mined.value} coins.**`
      )
      .setFooter({ text: `Durability left: ${tool.durability}/20` });

    await interaction.reply({ embeds: [embed] });
  },
};