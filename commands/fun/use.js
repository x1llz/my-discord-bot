const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const invPath = path.join(__dirname, "../../data/inventory.json");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("use")
    .setDescription("Use an item from your inventory 🧩")
    .addStringOption((opt) =>
      opt
        .setName("item")
        .setDescription("Item name (ticket, gem, box)")
        .setRequired(true)
    ),

  async execute(interaction) {
    const itemName = interaction.options.getString("item").toLowerCase();
    if (!fs.existsSync(invPath)) fs.writeFileSync(invPath, JSON.stringify({}));
    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));

    const inv = JSON.parse(fs.readFileSync(invPath, "utf8"));
    const coins = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const userId = interaction.user.id;

    if (!inv[userId] || !inv[userId][itemName])
      return interaction.reply({
        content: "❌ You don’t own this item.",
        ephemeral: true,
      });

    inv[userId][itemName]--;

    if (inv[userId][itemName] <= 0) delete inv[userId][itemName];

    let result = "";

    if (itemName === "ticket") {
      const win = Math.random() < 0.25;
      const reward = win ? Math.floor(Math.random() * 1000) + 500 : 0;
      if (win) {
        coins[userId].coins += reward;
        result = `🎉 You won **${reward} coins** from your Lottery Ticket!`;
      } else result = "💀 You lost this Lottery Ticket. No luck this time.";
    } else if (itemName === "gem") {
      result = "💎 You admired your Gem. Pure flex value.";
    } else if (itemName === "box") {
      const reward = Math.floor(Math.random() * 1500) + 250;
      coins[userId].coins += reward;
      result = `📦 You opened your Mystery Box and found **${reward} coins!**`;
    } else {
      result = "❓ Unknown item. Nothing happened.";
    }

    fs.writeFileSync(invPath, JSON.stringify(inv, null, 2));
    fs.writeFileSync(coinsPath, JSON.stringify(coins, null, 2));

    await interaction.reply({ content: result });
  },
};