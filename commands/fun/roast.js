const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "roast",
  description: "Roast someone 🔥",
  async execute(message, args) {
    const target = message.mentions.users.first();
    if (!target) return message.reply("You need to mention someone to roast.");

    const roasts = [
      "You're the reason the gene pool needs a lifeguard.",
      "I'd agree with you but then we'd both be wrong.",
      "You bring everyone so much joy... when you leave the room.",
      "You're like a cloud. When you disappear, it's a beautiful day.",
      "If laughter is the best medicine, your face must be curing the world.",
      "You're not stupid; you just have bad luck thinking.",
      "You have something on your chin... no, the third one down.",
      "You're proof evolution can go in reverse.",
      "I would explain it to you, but I left my crayons at home.",
      "You're like a software update, whenever I see you I think 'not now'.",
    ];

    const roast = roasts[Math.floor(Math.random() * roasts.length)];

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🔥 Roast Incoming!")
      .setDescription(`> **${target.username}**, ${roast}`)
      .setFooter({ text: "Made by X1LLZ | discord.gg/hellz" });

    message.channel.send({ embeds: [embed] });
  },
};