const { EmbedBuilder } = require("discord.js");

module.exports = {
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
      "You must be tired, 'cause you’ve been running through my mind all day 🏃‍♀️",
      "Are you French? 'Cause Eiffel for you 🗼",
      "I’m not a photographer, but I can picture us together 📸",
      "You must be a time traveler, 'cause I can’t imagine my future without you ⏳",
      "If beauty were a crime, you’d be serving a life sentence 🔥",
      "Are you a light switch? 'Cause you turn me on 💡",
      "You got more curves than my favorite racetrack 🏎️",
      "Are you a campfire? 'Cause you’re hot and I want s’more 🔥🍫",
      "You must be made of copper and tellurium, 'cause you’re Cu-Te 🧪",
      "You’re like a dictionary... you add meaning to my life 📖",
      "Are you a parking ticket? 'Cause you got ‘fine’ written all over you 💅",
      "If kisses were snowflakes, I’d send you a blizzard ❄️💋",
      "You must be a star, 'cause your beauty lights up my world 🌟",
      "Girl, are you oxygen? 'Cause I can’t live without you 💨",
      "You got me acting like a math problem — can’t solve why I’m so into you 🧮",
      "You’re like the sun... hard to look at but impossible to live without ☀️",
      "You’re the reason even the stars look jealous tonight ✨",
      "I must be a museum, 'cause you’re truly a work of art 🖼️",
      "You got more drip than an ocean 🌊💧",
      "You so fine, even AI couldn’t generate someone like you 🤖",
      "Are you gravity? 'Cause you’re pulling me in 🌀",
      "Even if I lost my vision, I’d still find you in a crowd 💙",
      "Are you my favorite song? 'Cause I got you on repeat 🎵",
      "I’d never play hide and seek with you — 'cause someone like you’s impossible to find 🔍",
      "You got that kind of smile that makes the moon jealous 🌙",
      "If looks could kill, you’d be a whole crime scene 🚔",
      "You the ‘You’re mine’ type, not the ‘you up?’ type 💌",
      "If your heart was a door, I’d knock... but I already got the key 🔑",
      "Girl, you make my CPU overheat 🔥💻",
      "Are you electricity? 'Cause you light up my dark days ⚡",
      "You make me forget how to breathe every damn time 😮‍💨",
      "You’re proof that God still flexes sometimes 🙏",
      "I ain’t a weatherman but I can tell you got a 100% chance of taking my heart 🌧️❤️",
      "You’re like a limited edition — only one of you in the world 💎",
      "Even ChatGPT couldn’t come up with someone like you 😉",
      "You’re that notification I actually *want* to see 🔔",
      "You got me acting like a bugged NPC — just staring and glitching 💀",
      "You could make Wi-Fi signals stronger just by existing 📶",
      "If love was a crime, I’d turn myself in for you 🥺",
      "Are you Discord Nitro? 'Cause you just boosted my mood 💜",
      "You make 100 ping feel like 0 — instant connection ⚡",
      "You’re the update I didn’t know I needed 📲",
      "You so fine, even the bots stopped running commands for a sec 🤖💘",
      "If I had a star for every time you made me smile, I’d own a galaxy 🌌",
      "You got the kind of beauty that even filters envy ✨",
      "You’re like my favorite playlist — never gets old 🎶",
      "You got that premium vibe... no trial, no ads 😏",
      "You’re the only reason I’d ever go AFK ❤️",
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