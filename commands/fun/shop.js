const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const shopItems = [
  { name: "🎟️ Lottery Ticket", price: 500, desc: "Chance to win big!" },
  { name: "💎 Gem", price: 1000, desc: "Collectible flex item." },
  { name: "📦 Mystery Box", price: 2500, desc: "Contains random prizes (future update)" },
];
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("View the Hellz item shop 🛒"),

  async execute(interaction) {
    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));

    const embed = new EmbedBuilder()
      .setColor("Gold")
      .setTitle("🛒 Hellz Shop")
      .setDescription(
        shopItems.map((i, n) => `**${n + 1}. ${i.name}** — ${i.price} coins\n> ${i.desc}`).join("\n\n")
      )
      .setFooter({ text: "Use /buy <item_name> to purchase" });

    await interaction.reply({ embeds: [embed] });
  },
};