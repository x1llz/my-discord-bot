const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("trivia")
    .setDescription("Random trivia question for coins 🎯"),

  async execute(interaction) {
    const triviaList = [
      { q: "What year did Discord release?", options: ["2013", "2015", "2017", "2019"], correct: "2015" },
      { q: "Who created Bitcoin?", options: ["Vitalik Buterin", "Satoshi Nakamoto", "Elon Musk", "Bill Gates"], correct: "Satoshi Nakamoto" },
      { q: "What’s the rarest blood type?", options: ["O-", "AB-", "A+", "B+"], correct: "AB-" },
      { q: "How many continents exist?", options: ["5", "6", "7", "8"], correct: "7" },
    ];
    const question = triviaList[Math.floor(Math.random() * triviaList.length)];

    const buttons = new ActionRowBuilder().addComponents(
      question.options.map(opt =>
        new ButtonBuilder().setCustomId(opt).setLabel(opt).setStyle(ButtonStyle.Primary)
      )
    );

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("🎯 Trivia Question")
      .setDescription(question.q);

    const msg = await interaction.reply({ embeds: [embed], components: [buttons], fetchReply: true });

    const collector = msg.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 15000,
    });

    collector.on("collect", async (i) => {
      if (i.user.id !== interaction.user.id)
        return i.reply({ content: "This trivia isn't for you.", ephemeral: true });

      const correct = i.customId === question.correct;
      await i.update({
        embeds: [
          new EmbedBuilder()
            .setColor(correct ? "Green" : "Red")
            .setDescription(
              correct
                ? `✅ Correct! You earned **150 coins!**`
                : `❌ Wrong! The answer was **${question.correct}**.`
            ),
        ],
        components: [],
      });
    });
  },
};