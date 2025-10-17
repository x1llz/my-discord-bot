const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "8ball",
  description: "Ask the magic 8ball a question 🎱 / Pose une question à la boule magique 🎱",
  async execute(message, args) {
    const question = args.join(" ");
    if (!question)
      return message.reply("❌ Please ask a full question! / Pose une vraie question !");

    const replies = [
      "Yes 💙 / Oui 💙",
      "No 💀 / Non 💀",
      "Maybe 🤔 / Peut-être 🤔",
      "Definitely 💫 / Définitivement 💫",
      "I don’t think so 😬 / Je ne pense pas 😬",
      "Ask again later 🕒 / Redemande plus tard 🕒",
      "It’s certain ✨ / C’est certain ✨",
      "Don’t count on it ❌ / N’y compte pas ❌",
      "Very doubtful 😶 / Très douteux 😶",
      "The stars say yes 🌌 / Les étoiles disent oui 🌌"
    ];

    const result = replies[Math.floor(Math.random() * replies.length)];

    const embed = new EmbedBuilder()
      .setColor("#4db8ff")
      .setTitle("🎱 Magic 8Ball / Boule magique 🎱")
      .setDescription(`**❓ Question / Question :** ${question}\n\n**💬 Answer / Réponse :** ${result}`)
      .setFooter({ text: "Made by X1LLZ 💻 | discord.gg/hellz" })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};