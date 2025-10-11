<<<<<<< HEAD
const Discord = require('discord.js');

module.exports = {
    name: 'roast',
    description: 'Roast someone brutally 🔥',
    execute(message, args) {
        const target = message.mentions.users.first() || message.author;

        const roasts = [
            "You bring everyone so much joy… when you leave the room.",
            "I'd agree with you but then we’d both be wrong.",
            "You have something on your chin... no, the third one down.",
            "You're like a cloud. When you disappear, it’s a beautiful day.",
            "You remind me of a cloud — full of hot air and blocking everyone’s shine.",
            "Your secrets are safe with me. I never even listen when you tell me them.",
            "You have an entire lifetime to be a better person. So far, you’re wasting it.",
            "You look like you were drawn with my left hand.",
            "I would roast you more, but nature already did the job.",
            "Somewhere out there, a tree is working hard to produce oxygen for you. You owe it an apology.",
            "You have something that most people don’t: consistently bad opinions.",
            "You’re proof that evolution can go in reverse.",
            "I’d call you sharp, but even butter knives are more dangerous.",
            "You have a great face for radio.",
            "You’re like the human version of a typo.",
            "You’re not stupid; you just have bad luck thinking.",
            "You must have been born on a highway — that’s where most accidents happen.",
            "You're like a cloud of Wi-Fi — weak and always dropping.",
            "You bring everyone down, even gravity’s impressed.",
            "Your brain’s not bad, it’s just… under maintenance permanently.",
            "You have two brain cells left, and they’re fighting for custody of your last idea.",
            "You’re not the dumbest person here, but you better hope they don’t leave.",
            "If I wanted to kill myself, I’d climb your ego and jump to your IQ.",
            "You’re like a software update — every time I see you, I think, 'Not now.'",
            "Your birth certificate is an apology letter from the hospital.",
            "You’re like a cloud of mosquitoes — small, annoying, and no one wants you around.",
            "You make onions cry.",
            "I’d explain it to you, but I left my crayons at home.",
            "Your mind is like a web browser with 200 tabs open, and 198 of them are frozen.",
            "You're not even worth a low-effort meme template.",
            "You’re the reason shampoo has instructions.",
            "I’d say you’re one in a million, but that means there are 8,000 people just like you.",
            "You bring balance to the world — 50% cringe, 50% disappointment.",
            "If ignorance is bliss, you must be the happiest person alive.",
            "You’re like a participation trophy that learned how to talk.",
            "You have a face that could make onions cry.",
            "You’re living proof that natural selection takes breaks.",
            "If laughter is the best medicine, your existence is the disease.",
            "You have the charisma of a wet towel.",
            "You look like the before picture in every ad ever.",
            "You’re like a cloud of lag — ruining everyone’s experience.",
            "You’re so fake that Barbie’s jealous.",
            "You’re like a math problem nobody asked for and everyone skips.",
            "I’d call you useless, but that’s offensive to useless things.",
            "You’re not ugly, but Photoshop would need a day off after you.",
            "You’re like a Wi-Fi signal from McDonald's — weak and inconsistent.",
            "You have the emotional range of a teaspoon.",
            "You're what happens when autocorrect gives up.",
            "You're like a Google search with 'I'm feeling unlucky.'",
            "You have the personality of an expired battery.",
            "If stupidity were a sport, you’d have Olympic gold medals.",
            "You could be replaced by a traffic cone and no one would notice."
        ];

        const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];

        const embed = new Discord.EmbedBuilder()
            .setColor("#ff0066")
            .setTitle("🔥 Roast Incoming 🔥")
            .setDescription(`**${target.username}**, ${randomRoast}`)
            .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
=======
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
>>>>>>> bc39ee4acadc7aea05e1de60c118c05a19a7c06d
};
