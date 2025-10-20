import { EmbedBuilder } from "discord.js";

export default {
  name: "rizz",
  description: "Drop a random rizz line to impress someone 😏",
  async execute(message) {
    const rizzLines = [
      "Are you French? Because **Eiffel** for you 🇫🇷😉",
      "Girl, are you WiFi? Because I'm really feeling a connection 💫",
      "You’re so hot you made my GPU overheat 🔥",
      "Are you a magician? Because whenever I look at you, everyone else disappears ✨",
      "You must be tired... because you’ve been running through my mind all day 🧠💘",
      "If beauty were time, you’d be eternity ⏳❤️",
      "Are you from the sky? ‘Cause damn, you’re out of this world 🌎🚀",
      "You’re like a Discord Nitro — I can’t live without you 💎",
      "Call me Minecraft, ‘cause I’m falling into your world 🌌",
      "If I could rearrange the alphabet, I’d put U and I together 🥰",
      "Girl, do you play Valorant? ‘Cause you just planted a spike in my heart 💣💖",
      "You're so fine, you made me forget my prefix 😳",
      "Are you a keyboard? ‘Cause you’re just my type ⌨️😉",
      "They say nothing lasts forever… will you be my nothing? 💞",
      "You must be 1 HP, ‘cause you just killed me 😩💀"
    ];

    const randomRizz = rizzLines[Math.floor(Math.random() * rizzLines.length)];

    const embed = new EmbedBuilder()
      .setColor("#00bfff")
      .setTitle("💘 Rizz Generator")
      .setDescription(`**${randomRizz}**`)
      .setFooter({ text: `Made by x1llz | discord.gg/hellz` });

    await message.channel.send({ embeds: [embed] });
  },
};