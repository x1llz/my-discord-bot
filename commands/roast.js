const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "roast",
  description: "Roast someone with spicy gamer-level insults 😈",
  async execute(message, args) {
    const target = message.mentions.users.first();
    if (!target) {
      return message.reply("👀 You need to mention someone to roast! Example: `+roast @user`");
    }

    // Long, clever, funny roasts 🔥
    const roasts = [
      "You're like a software update that no one asked for, takes forever, and breaks everything after installation 💀",
      "You're the human version of lag — always late, never smooth, and ruining everyone else's experience 🧠💻",
      "Your Wi-Fi signal must be made of hopes and dreams because it never actually connects 🤡",
      "If common sense were RAM, you'd still be running Windows 98 on a potato 🥔",
      "You're proof that evolution sometimes hits pause and never presses resume 😭",
      "You're like JavaScript semicolons — completely optional, but when you show up, everything breaks 💀",
      "Your aim in games is so bad, I bet you misspell ‘hitbox’ as ‘hopebox’ 🎯😂",
      "You're the kind of player that blames lag in single-player mode 💀",
      "You're like a Discord bot that only responds to `!cringe` 😬",
      "Even ChatGPT refused to roast you because it couldn't find any logic to work with 🧠",
      "If being slow was a skill, you’d be the final boss of loading screens ⏳",
      "You're like a corrupted save file — existed once, now just pain and confusion 💾",
      "Your voice sounds like a microwave trying to connect to Bluetooth 📡",
      "You're the living embodiment of a 404 error — no brain found 😭",
      "You're like an expired energy drink — you try to hype people up, but all you do is make them sick 🧃",
      "Your jokes are so dry they made the Sahara Desert file a copyright claim 🌵",
      "You're the reason tutorials have a ‘skip intro’ button 😂",
      "You're the kind of person to lose a 1v1 against a Minecraft chicken 🐔",
      "You look like you still rage-quit UNO IRL 💀",
      "You're built like an unoptimized Python script — slow, messy, and full of exceptions 🐍",
      "If dumb was a coding language, you'd be the full-stack developer 💀",
      "You type like someone who thinks CAPS LOCK adds power ⚡",
      "You're like a Google search with no results — completely useless but still trying 😭",
      "Even your shadow left because it got tired of following failure 👻",
      "You probably download RAM when your PC lags 💻",
      "You're the DLC no one asked for, but we still got stuck with 😭",
      "You're the reason Discord servers have a mute button 🔇",
      "You're like a mobile game ad — loud, annoying, and always lying about how good you are 📱",
      "You could stare at a loading screen and still lose focus 💀",
      "You're like an anime filler episode — absolutely no purpose but still here 💫",
      "You fail faster than my Wi-Fi during a ranked match 📶",
      "You're like an NPC that forgot its dialogue line halfway through the quest 😭",
      "If stupidity was an NFT, you'd be worth millions 💸",
      "You're basically a patch note that says 'fixed nothing, broke everything' 🧩",
      "You're like a boss fight where the only challenge is staying awake 😴",
      "You're so cringe that TikTok banned your energy for being off-brand 💀",
      "You're the only person who could lose in creative mode 😂",
      "Even your reflection left the chat 👋",
      "You're like a Genshin player with no Primogems and too much confidence 💎",
      "You’ve got more bugs than Cyberpunk 2077 at launch 🚗💥"
    ];

    const roast = roasts[Math.floor(Math.random() * roasts.length)];

    // Embed for clean display 🔥
    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("🔥 Roast Mode: Activated 🔥")
      .setDescription(`**${target.username}**, ${roast}`)
      .setFooter({ text: "Made by X1LLZ 💻 | Hellz Bot", iconURL: message.client.user.displayAvatarURL() })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
