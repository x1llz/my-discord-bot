const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const invPath = path.join(__dirname, "../../data/inventory.json");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sell")
    .setDescription("Sell items from your inventory 💵")
    .addStringOption((opt) =>
      opt.setName("item").setDescription("Item name to sell").setRequired(true)
    )
    .addIntegerOption((opt) =>
      opt.setName("amount").setDescription("How many to sell").setRequired(true)
    ),

  async execute(interaction) {
    const item = interaction.options.getString("item");
    const amount = interaction.options.getInteger("amount");

    if (!fs.existsSync(invPath)) fs.writeFileSync(invPath, JSON.stringify({}));
    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    const inv = JSON.parse(fs.readFileSync(invPath, "utf8"));
    const coins = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const userId = interaction.user.id;

    if (!inv[userId] || !inv[userId][item])
      return interaction.reply({
        content: "❌ You don’t have that item.",
        ephemeral: true,
      });

    if (amount <= 0 || inv[userId][item] < amount)
      return interaction.reply({
        content: "❌ Invalid quantity.",
        ephemeral: true,
      });

    const value = Math.floor(Math.random() * 300) + 100; // Random price
    const total = value * amount;

    inv[userId][item] -= amount;
    if (inv[userId][item] <= 0) delete inv[userId][item];
    if (!coins[userId]) coins[userId] = { coins: 0, lastDaily: 0 };
    coins[userId].coins += total;

    fs.writeFileSync(invPath, JSON.stringify(inv, null, 2));
    fs.writeFileSync(coinsPath, JSON.stringify(coins, null, 2));

    await interaction.reply({
      content: `💵 You sold **${amount}x ${item}** for **${total} coins.**`,
    });
  },
};