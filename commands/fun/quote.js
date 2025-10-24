const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const quotes = {
  motivation: [
    "Push yourself, because no one else is going to do it for you.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Dream big. Start small. Act now.",
  ],
  love: [
    "Love is composed of a single soul inhabiting two bodies.",
    "You can’t blame gravity for falling in love.",
    "Love yourself first and everything else falls into line.",
  ],
  money: [
    "Don’t work for money, make money work for you.",
    "The goal isn’t more money, the goal is financial freedom.",
    "Rich is having money. Wealth is having time.",
  ],
  mindset: [
    "Your only limit is your mind.",
    "Discipline will take you places motivation can’t.",
    "Success is 90% mindset, 10% action.",
  ],
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("Get an inspirational quote.")
    .addStringOption((opt) =>
      opt
        .setName("category")
        .setDescription("Type of quote")
        .setRequired(true)
        .addChoices(
          { name: "Motivation", value: "motivation" },
          { name: "Love", value: "love" },
          { name: "Money", value: "money" },
          { name: "Mindset", value: "mindset" }
        )
    ),

  async execute(interaction) {
    const category = interaction.options.getString("category");
    const list = quotes[category];
    const quote = list[Math.floor(Math.random() * list.length)];

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle(`💬 ${category.toUpperCase()} Quote`)
      .setDescription(`*"${quote}"*`);

    await interaction.reply({ embeds: [embed] });
  },
};