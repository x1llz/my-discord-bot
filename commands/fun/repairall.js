const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const coinsPath = path.join(__dirname, "../../data/coins.json");
const toolsPath = path.join(__dirname, "../../data/tools.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("repairall")
    .setDescription("Repair all your tools at once 🧰"),

  async execute(interaction) {
    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    if (!fs.existsSync(toolsPath)) fs.writeFileSync(toolsPath, JSON.stringify({}));

    const coins = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const tools = JSON.parse(fs.readFileSync(toolsPath, "utf8"));
    const userId = interaction.user.id;

    if (!tools[userId] || Object.keys(tools[userId]).length === 0)
      return interaction.reply({
        content: "❌ You don’t own any tools to repair.",
        ephemeral: true,
      });

    if (!coins[userId]) coins[userId] = { coins: 0, lastDaily: 0 };
    const totalTools = Object.keys(tools[userId]).length;
    const cost = totalTools * 500;

    if (coins[userId].coins < cost)
      return interaction.reply({
        content: `💀 You need **${cost} coins** to repair all your tools.`,
        ephemeral: true,
      });

    coins[userId].coins -= cost;
    for (const tool of Object.values(tools[userId])) tool.durability = 20;

    fs.writeFileSync(coinsPath, JSON.stringify(coins, null, 2));
    fs.writeFileSync(toolsPath, JSON.stringify(tools, null, 2));

    await interaction.reply({
      content: `🧰 All your tools are fully repaired (20 durability each) for **${cost} coins**.`,
    });
  },
};