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
    .setName("quiz")
    .setDescription("Answer a quick quiz and earn coins 🧠"),

  async execute(interaction) {
    const questions = [
      {
        q: "What’s the capital of France?",
        options: ["Berlin", "Paris", "Rome", "Madrid"],
        correct: "Paris",
      },
      {
        q: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: "Mars",
      },
      {
        q: "Who created Discord?",
        options: ["Jason Citron", "Mark Zuckerberg", "Elon Musk", "Pavel Durov"],
        correct: "Jason Citron",
      },
    ];
    const question = questions[Math.floor(Math.random() * questions.length)];

    const row = new ActionRowBuilder().addComponents(
      question.options.map((opt) =>
        new ButtonBuilder().setCustomId(opt).setLabel(opt).setStyle(ButtonStyle.Secondary)
      )
    );

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("🧠 Quiz Time!")
      .setDescription(question.q);

    const msg = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });

    const collector = msg.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 15000,
    });

    collector.on("collect", async (i) => {
      if (i.user.id !== interaction.user.id)
        return i.reply({ content: "Not your quiz.", ephemeral: true });

      const correct = i.customId === question.correct;
      await i.update({
        embeds: [
          new EmbedBuilder()
            .setColor(correct ? "Green" : "Red")
            .setDescription(
              correct
                ? `✅ Correct! You earned **200 coins!**`
                : `❌ Wrong! The correct answer was **${question.correct}**.`
            ),
        ],
        components: [],
      });
    });
  },
};