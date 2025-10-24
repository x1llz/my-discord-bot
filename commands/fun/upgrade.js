const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const coinsPath = path.join(__dirname, "../../data/coins.json");
const toolsPath = path.join(__dirname, "../../data/tools.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("upgrade")
    .setDescription("Upgrade a tool to increase its durability 🔩")
    .addStringOption((opt) =>
      opt
        .setName("tool")
        .setDescription("Tool to upgrade (pickaxe, rod, shovel, rifle)")
        .setRequired(true)
    ),

  async execute(interaction) {
    const toolId = interaction.options.getString("tool").toLowerCase();

    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    if (!fs.existsSync(toolsPath)) fs.writeFileSync(toolsPath, JSON.stringify({}));

    const coins = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const tools = JSON.parse(fs.readFileSync(toolsPath, "utf8"));
    const userId = interaction.user.id;

    if (!tools[userId] || !tools[userId][toolId])
      return interaction.reply({
        content: "❌ You don’t own this tool.",
        ephemeral: true,
      });

    const upgradeCost = 2000;
    if (!coins[userId] || coins[userId].coins < upgradeCost)
      return interaction.reply({
        content: `💀 You need **${upgradeCost} coins** to upgrade this tool.`,
        ephemeral: true,
      });

    const tool = tools[userId][toolId];
    const newDurability = tool.durability + 5 > 50 ? 50 : tool.durability + 5;

    coins[userId].coins -= upgradeCost;
    tool.durability = newDurability;

    fs.writeFileSync(coinsPath, JSON.stringify(coins, null, 2));
    fs.writeFileSync(toolsPath, JSON.stringify(tools, null, 2));

    await interaction.reply({
      content: `🔩 Upgraded your **${toolId}**! Durability is now **${newDurability}/50**.`,
    });
  },
};