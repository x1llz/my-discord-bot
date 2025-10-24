const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("heist")
    .setDescription("Plan a heist with your friends for massive rewards 💣")
    .addIntegerOption((opt) =>
      opt.setName("bet").setDescription("Amount each participant bets").setRequired(true)
    ),

  async execute(interaction) {
    const bet = interaction.options.getInteger("bet");
    if (bet <= 0)
      return interaction.reply({ content: "Invalid bet amount.", ephemeral: true });

    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    const data = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const userId = interaction.user.id;
    if (!data[userId] || data[userId].coins < bet)
      return interaction.reply({ content: "💀 Not enough coins to start a heist.", ephemeral: true });

    const success = Math.random() < 0.4;
    const reward = bet * (Math.floor(Math.random() * 5) + 2);

    if (success) {
      data[userId].coins += reward;
      msg = `💣 The heist succeeded! You stole **${reward} coins!**`;
    } else {
      data[userId].coins -= bet;
      msg = "🚔 The cops caught you. You lost your heist money.";
    }

    fs.writeFileSync(coinsPath, JSON.stringify(data, null, 2));
    await interaction.reply({ content: msg });
  },
};