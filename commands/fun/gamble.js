const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gamble")
    .setDescription("Gamble your coins 🎰")
    .addIntegerOption((opt) =>
      opt.setName("amount").setDescription("Coins to bet").setRequired(true)
    ),

  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");
    const userId = interaction.user.id;

    if (amount <= 0)
      return interaction.reply({ content: "Bet amount must be positive.", ephemeral: true });

    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    const data = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    if (!data[userId]) data[userId] = { coins: 0, lastDaily: 0 };

    if (data[userId].coins < amount)
      return interaction.reply({ content: "You don’t have enough coins 😭", ephemeral: true });

    const win = Math.random() < 0.45; // 45% win chance
    const gain = win ? amount : -amount;

    data[userId].coins += gain;
    fs.writeFileSync(coinsPath, JSON.stringify(data, null, 2));

    const embed = new EmbedBuilder()
      .setColor(win ? "Green" : "Red")
      .setTitle("🎰 Gambling Result")
      .setDescription(
        win
          ? `You won **${amount} coins**! 🤑`
          : `You lost **${amount} coins**. Better luck next time 💀`
      )
      .setFooter({ text: `Your balance: ${data[userId].coins} coins` });

    await interaction.reply({ embeds: [embed] });
  },
};