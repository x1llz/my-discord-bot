const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dice")
    .setDescription("Roll a dice 🎲")
    .addIntegerOption((opt) =>
      opt.setName("sides").setDescription("Number of sides (default 6)").setRequired(false)
    ),

  async execute(interaction) {
    const sides = interaction.options.getInteger("sides") || 6;
    const result = Math.floor(Math.random() * sides) + 1;

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("🎲 Dice Roll")
      .setDescription(`You rolled a **${result}** (1-${sides})`);

    await interaction.reply({ embeds: [embed] });
  },
};