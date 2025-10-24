const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const coinsPath = path.join(__dirname, "../../data/coins.json");
const invPath = path.join(__dirname, "../../data/inventory.json");

const shopItems = [
  { id: "ticket", name: "🎟️ Lottery Ticket", price: 500 },
  { id: "gem", name: "💎 Gem", price: 1000 },
  { id: "box", name: "📦 Mystery Box", price: 2500 },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("buy")
    .setDescription("Buy an item from the Hellz shop 🛒")
    .addStringOption((opt) =>
      opt
        .setName("item")
        .setDescription("Item name (ticket, gem, box)")
        .setRequired(true)
    ),

  async execute(interaction) {
    const itemName = interaction.options.getString("item").toLowerCase();
    const item = shopItems.find((i) => i.id === itemName);

    if (!item)
      return interaction.reply({
        content: "❌ Invalid item name.",
        ephemeral: true,
      });

    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    if (!fs.existsSync(invPath)) fs.writeFileSync(invPath, JSON.stringify({}));

    const coins = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const inv = JSON.parse(fs.readFileSync(invPath, "utf8"));

    const userId = interaction.user.id;
    if (!coins[userId]) coins[userId] = { coins: 0, lastDaily: 0 };
    if (coins[userId].coins < item.price)
      return interaction.reply({
        content: "💀 You don’t have enough coins.",
        ephemeral: true,
      });

    coins[userId].coins -= item.price;
    if (!inv[userId]) inv[userId] = {};
    if (!inv[userId][item.id]) inv[userId][item.id] = 0;
    inv[userId][item.id]++;

    fs.writeFileSync(coinsPath, JSON.stringify(coins, null, 2));
    fs.writeFileSync(invPath, JSON.stringify(inv, null, 2));

    await interaction.reply({
      content: `✅ You bought **${item.name}** for **${item.price} coins**.`,
    });
  },
};