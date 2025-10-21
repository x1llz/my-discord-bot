import { EmbedBuilder } from "discord.js";

export default {
  name: "rizz",
  description: "Drop a random Rizz line 😏",
  
  execute(message) {
    const rizzLines = [
      "Girl, are you Wi-Fi? 'Cause I'm really feelin' a connection 📶",
      "You’re like a keyboard... 'cause you’re just my type ⌨️😉",
      "I must be a snowflake, 'cause I've fallen for you ❄️",
      "Are you a magician? 'Cause every time I look at you, everyone else disappears ✨",
      "Your name must be Google, 'cause you got everything I’ve been searching for 🔍",
      "Are you a bank loan? 'Cause you got my interest 💸",
      "Do you have a map? 'Cause I keep getting lost in your eyes 🗺️",
      "Are you French? 'Cause Eiffel for you 🗼",
      "You must be tired, 'cause you’ve been running through my mind all day 🏃‍♀️",
      "Are you a light switch? 'Cause you turn me on 💡",
      "You must be made of copper and tellurium, 'cause you’re Cu-Te 🧪",
      "You’re like a dictionary... you add meaning to my life 📖",
      "If beauty were a crime, you’d be serving a life sentence 🔥",
      "If kisses were snowflakes, I’d send you a blizzard ❄️💋",
      "You must be a star, 'cause your beauty lights up my world 🌟",
      "Girl, are you oxygen? 'Cause I can’t live without you 💨",
      "You got me acting like a math problem — can’t solve why I’m so into you 🧮",
      "You’re the reason even the stars look jealous tonight ✨",
      "You’re like the sun... hard to look at but impossible to live without ☀️",
      "I must be a museum, 'cause you’re truly a work of art 🖼️",
      "You so fine, even AI couldn’t generate someone like you 🤖",
      "Are you gravity? 'Cause you’re pulling me in 🌀",
      "You’re like my favorite song, 'cause I got you on repeat 🎵",
      "You got that premium vibe... no trial, no ads 😏",
      "You’re that notification I actually *want* to see 🔔",
      "Even ChatGPT couldn’t come up with someone like you 😉",
      "You’re the only reason I’d ever go AFK ❤️",
      "Are you Discord Nitro? 'Cause you just boosted my mood 💜",
      "You’re the update I didn’t know I needed 📲",
      "If love was a crime, I’d turn myself in for you 🥺",
      "You make 100 ping feel like 0 — instant connection ⚡",
      "You could make Wi-Fi signals stronger just by existing 📶",
      "You make me forget how to breathe every damn time 😮‍💨",
      "You got more drip than an ocean 🌊💧",
      "Even if I lost my vision, I’d still find you in a crowd 💙",
      "If I had a star for every time you made me smile, I’d own a galaxy 🌌",
      "You got the kind of beauty that even filters envy ✨",
      "You’re like my favorite playlist — never gets old 🎶",
      "You got more style than a custom emoji 😎",
      "You’re proof that God still flexes sometimes 🙏",
      "Girl, you make my CPU overheat 🔥💻",
      "You must be a time traveler, 'cause I can’t imagine my future without you ⏳",
      "You’re like the dictionary definition of ‘perfect’ 💫",
      "You got more glow than a legendary drop 💎",
      "You’re the ‘You’re mine’ type, not the ‘you up?’ type 💌",
      "You must be tired — running through my mind since I logged in 🏃‍♂️",
      "Are you a vibe? 'Cause you just made my mood 100% better 😍",
      "You so smooth, even butter jealous 🧈",
      "You got me acting like a bugged NPC — just staring and glitching 💀",
      "You make Discord dark mode look bright 😏"
    ];

    const rizz = rizzLines[Math.floor(Math.random() * rizzLines.length)];

    const embed = new EmbedBuilder()
      .setColor("#9b59b6")
      .setTitle("💖 Rizz Activated 💖")
      .setDescription(rizz)
      .setFooter({ text: "Made by X1LLZ 💻 | discord.gg/hellz" })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};