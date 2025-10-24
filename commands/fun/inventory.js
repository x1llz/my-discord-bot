const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const invPath = path.join(__dirname, "../../data/inventory.json");
const shopItems = {
  ticket: "🎟️ Lottery Ticket",
  gem: "💎 Gem",
  box: "📦 Mystery Box",
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("Check your inventory 🎒")
    .addUserOption((opt) =>
      opt.setName("user").setDescription("Check someone else’s inventory").setRequired(false)
    ),

  async execute(interaction) {
    if (!fs.existsSync(invPath)) fs.writeFileSync(invPath, JSON.stringify({}));
    const data = JSON.parse(fs.readFileSync(invPath, "utf8"));
    const user = interaction.options.getUser("user") || interaction.user;
    const inv = data[user.id] || {};

    const content =
      Object.entries(inv).length > 0
        ? Object.entries(inv)
            .map(([id, count]) => `${shopItems[id] || id} × **${count}**`)
            .join("\n")
        : "Empty bag 🪶";

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle(`🎒 ${user.username}'s Inventory`)
      .setDescription(content);

    await interaction.reply({ embeds: [embed] });
  },
};