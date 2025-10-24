const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const coinsPath = path.join(__dirname, "../../data/coins.json");
const toolsPath = path.join(__dirname, "../../data/tools.json");

const tools = [
  { id: "pickaxe", name: "⛏️ Pickaxe", price: 1500, durability: 20 },
  { id: "rod", name: "🎣 Fishing Rod", price: 1500, durability: 20 },
  { id: "shovel", name: "🪓 Shovel", price: 1500, durability: 20 },
  { id: "rifle", name: "🏹 Hunting Rifle", price: 2000, durability: 20 },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("buytool")
    .setDescription("Buy a tool to use in Hellz activities ⚙️")
    .addStringOption((opt) =>
      opt
        .setName("tool")
        .setDescription("Tool name (pickaxe, rod, shovel, rifle)")
        .setRequired(true)
    ),

  async execute(interaction) {
    const toolId = interaction.options.getString("tool").toLowerCase();
    const tool = tools.find((t) => t.id === toolId);

    if (!tool)
      return interaction.reply({
        content: "❌ Invalid tool name.",
        ephemeral: true,
      });

    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    if (!fs.existsSync(toolsPath)) fs.writeFileSync(toolsPath, JSON.stringify({}));

    const coins = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const userTools = JSON.parse(fs.readFileSync(toolsPath, "utf8"));
    const userId = interaction.user.id;

    if (!coins[userId]) coins[userId] = { coins: 0, lastDaily: 0 };
    if (!userTools[userId]) userTools[userId] = {};

    if (coins[userId].coins < tool.price)
      return interaction.reply({
        content: "💀 Not enough coins to buy this tool.",
        ephemeral: true,
      });

    if (userTools[userId][tool.id])
      return interaction.reply({
        content: `⚠️ You already own a **${tool.name}**.`,
        ephemeral: true,
      });

    coins[userId].coins -= tool.price;
    userTools[userId][tool.id] = { durability: tool.durability };

    fs.writeFileSync(coinsPath, JSON.stringify(coins, null, 2));
    fs.writeFileSync(toolsPath, JSON.stringify(userTools, null, 2));

    await interaction.reply({
      content: `✅ You bought a **${tool.name}** with **${tool.durability} durability**.`,
    });
  },
};