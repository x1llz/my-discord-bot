const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "8ball",
  description: "Ask the magic 8ball a question 🎱",
  async execute(message, args) {
    const question = args.join(" ");
    if (!question) return message.reply("❓ You need to ask a question first!");

    const responses = [
      "Yes ✅",
      "No ❌",
      "Maybe 🤔",
      "Never 😤",
      "Obviously 😎",
      "Impossible 💀",
      "Ask later ⏳",
      "I doubt it 😬",
      "Of course 🫡",
      "Hmm... no 😕",
    ];

    const answer = responses[Math.floor(Math.random() * responses.length)];

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🎱 The Magic 8Ball says...")
      .setDescription(`> **Q:** ${question}\n> **A:** ${answer}`)
      .setFooter({ text: "Made by X1LLZ | discord.gg/hellz" });

    message.channel.send({ embeds: [embed] });
  },
};