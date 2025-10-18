import { EmbedBuilder } from "discord.js";

export default {
  name: "roast",
  description: "Roast someone 🔥",
  async execute(message) {
    const target = message.mentions.users.first() || message.author;
    const roasts = [
      "You're proof that evolution can go in reverse.",
      "If I wanted to kill myself, I'd climb your ego and jump to your IQ.",
      "You're like a cloud. When you disappear, it’s a beautiful day.",
      "You bring everyone so much joy when you leave the room.",
      "You're the reason the gene pool needs a lifeguard.",
      "You have something on your chin... no, the third one down.",
      "You look like what happens when AI generates a human.",
      "I'd agree with you, but then we’d both be wrong.",
      "You're like a software update—nobody wants you, but we’re stuck with you.",
      "Your secrets are safe with me. I never even listen when you tell me them."
    ];
    const roast = roasts[Math.floor(Math.random() * roasts.length)];

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🔥 Roast Incoming")
      .setDescription(`**${target.username}**, ${roast}`)
      .setFooter({ text: "Made by X1LLZ | discord.gg/hellz" });

    return message.channel.send({ embeds: [embed] });
  },
};