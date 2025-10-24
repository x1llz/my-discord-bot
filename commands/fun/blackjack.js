const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

function getCard() {
  const cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  return cards[Math.floor(Math.random() * cards.length)];
}

function getValue(card) {
  if (["J", "Q", "K"].includes(card)) return 10;
  if (card === "A") return 11;
  return parseInt(card);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("blackjack")
    .setDescription("Play a simple game of blackjack 🃏")
    .setDMPermission(true),

  async execute(interaction) {
    let playerCards = [getCard(), getCard()];
    let dealerCards = [getCard(), getCard()];

    const calcTotal = (cards) =>
      cards.reduce((a, c) => a + getValue(c), 0).toString();

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("🃏 Blackjack")
      .addFields(
        { name: "Your cards", value: playerCards.join(", ") },
        { name: "Dealer's cards", value: `${dealerCards[0]}, ?` }
      )
      .setFooter({ text: "Type /hit or /stand (to be added later in full system)" });

    await interaction.reply({ embeds: [embed] });
  },
};