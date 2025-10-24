const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bet")
    .setDescription("Bet your coins on a 50/50 chance 🪙")
    .addIntegerOption((opt) =>
      opt.setName("amount").setDescription("Coins to bet").setRequired(true)
    ),

  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");
    if (amount <= 0)
      return interaction.reply({ content: "Invalid bet amount.", ephemeral: true });

    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    const data = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const userId = interaction.user.id;

    if (!data[userId] || data[userId].coins < amount)
      return interaction.reply({ content: "💀 Not enough coins.", ephemeral: true });

    const win = Math.random() < 0.5;
    const result = win ? amount : -amount;
    data[userId].coins += result;

    fs.writeFileSync(coinsPath, JSON.stringify(data, null, 2));

    await interaction.reply({
      content: win
        ? `🎉 You won **${amount} coins!**`
        : `💀 You lost **${amount} coins.** Better luck next time.`,
    });
  },
};