const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slots")
    .setDescription("Spin the slot machine 🎰")
    .setDMPermission(true),

  async execute(interaction) {
    const symbols = ["🍒", "🍋", "🍇", "🍉", "7️⃣", "💎"];
    const roll = [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
    ];

    const win = roll[0] === roll[1] && roll[1] === roll[2];
    const result = roll.join(" | ");

    const embed = new EmbedBuilder()
      .setColor(win ? "Gold" : "Red")
      .setTitle("🎰 Slot Machine")
      .setDescription(`**${result}**\n${win ? "You win! 🤑" : "You lost 😭"}`);

    await interaction.reply({ embeds: [embed] });
  },
};