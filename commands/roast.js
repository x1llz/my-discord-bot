const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "roast",
  description: "Roast someone with spicy gamer-level insults 😈",
  async execute(message, args) {
    const target = message.mentions.users.first() || message.author;

    const roasts = [
      "You're like a software update that no one asked for, takes forever, and breaks everything after installation 💀",
      "You're the human version of lag — always late, never smooth, and ruining everyone else's experience 🧠💻",
      "If common sense were RAM, you'd still be running Windows 98 on a potato 🥔",
      "You're proof that evolution sometimes hits pause and never presses resume 😭",
      "Your aim in games is so bad, I bet you misspell ‘hitbox’ as ‘hopebox’ 🎯😂",
      "Even ChatGPT refused to roast you because it couldn't find any logic to work with 🧠",
      "You're like a corrupted save file — existed once, now just pain and confusion 💾",
      "Your jokes are so dry they made the Sahara Desert file a copyright claim 🌵",
      "You're like an anime filler episode — absolutely no purpose but still here 💫",
      "You fail faster than my Wi-Fi during a ranked match 📶",
      "You're like an NPC that forgot its dialogue line halfway through the quest 😭",
      "If stupidity was an NFT, you'd be worth millions 💸",
      "You're basically a patch note that says 'fixed nothing, broke everything' 🧩",
      "You're like a boss fight where the only challenge is staying awake 😴",
      "You're the reason Discord servers have a mute button 🔇",
      "You're like a mobile game ad — loud, annoying, and always lying about how good you are 📱",
      "Even your reflection left the chat 👋",
      "You look like you still rage-quit UNO IRL 💀",
      "You’re the reason shampoo has instructions 🧴",
      "You're like a Genshin player with no Primogems and too much confidence 💎",
      "You’ve got more bugs than Cyberpunk 2077 at launch 🚗💥"
    ];

    const roast = roasts[Math.floor(Math.random() * roasts.length)];

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("🔥 Roast Mode: Activated 🔥")
      .setDescription(`**${target.username}**, ${roast}`)
      .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
