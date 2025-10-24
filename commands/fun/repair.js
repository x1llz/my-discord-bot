const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const coinsPath = path.join(__dirname, "../../data/coins.json");
const toolsPath = path.join(__dirname, "../../data/tools.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("repair")
    .setDescription("Repair one of your tools 🔩")
    .addStringOption((opt) =>
      opt
        .setName("tool")
        .setDescription("Tool name (pickaxe, rod, shovel, rifle)")
        .setRequired(true)
    ),

  async execute(interaction) {
    const toolId = interaction.options.getString("tool").toLowerCase();

    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    if (!fs.existsSync(toolsPath)) fs.writeFileSync(toolsPath, JSON.stringify({}));

    const coins = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const userTools = JSON.parse(fs.readFileSync(toolsPath, "utf8"));
    const userId = interaction.user.id;

    if (!userTools[userId] || !userTools[userId][toolId])
      return interaction.reply({
        content: "❌ You don’t own this tool.",
        ephemeral: true,
      });

    const repairCost = 500;
    if (!coins[userId] || coins[userId].coins < repairCost)
      return interaction.reply({
        content: `💀 You need **${repairCost} coins** to repair your tool.`,
        ephemeral: true,
      });

    coins[userId].coins -= repairCost;
    userTools[userId][toolId].durability = 20;

    fs.writeFileSync(coinsPath, JSON.stringify(coins, null, 2));
    fs.writeFileSync(toolsPath, JSON.stringify(userTools, null, 2));

    await interaction.reply({
      content: `🔧 Your **${toolId}** has been fully repaired (20 durability).`,
    });
  },
};