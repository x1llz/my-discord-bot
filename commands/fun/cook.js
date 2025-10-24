const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const invPath = path.join(__dirname, "../../data/inventory.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cook")
    .setDescription("Cook random meals to sell or flex 🍳"),

  async execute(interaction) {
    if (!fs.existsSync(invPath)) fs.writeFileSync(invPath, JSON.stringify({}));
    const data = JSON.parse(fs.readFileSync(invPath, "utf8"));
    const userId = interaction.user.id;
    if (!data[userId]) data[userId] = {};

    const meals = [
      { name: "🍔 Burger", value: 1 },
      { name: "🍣 Sushi", value: 1 },
      { name: "🍕 Pizza", value: 1 },
      { name: "🥘 Paella", value: 1 },
      { name: "🍰 Cake", value: 1 },
    ];

    const meal = meals[Math.floor(Math.random() * meals.length)];
    if (!data[userId][meal.name]) data[userId][meal.name] = 0;
    data[userId][meal.name]++;

    fs.writeFileSync(invPath, JSON.stringify(data, null, 2));

    const embed = new EmbedBuilder()
      .setColor("Orange")
      .setTitle("🍳 Cooking Results")
      .setDescription(`You cooked **${meal.name}** and added it to your inventory!`);

    await interaction.reply({ embeds: [embed] });
  },
};