const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "roast",
  description: "Roast someone 🔥 / Clash un utilisateur 🔥",
  async execute(message) {
    const target = message.mentions.users.first();
    if (!target) return message.reply("⚠️ Mention someone to roast / Mentionne quelqu’un à roast");

    const roasts = [
      "You're proof evolution can go in reverse 🧬",
      "I'd explain it to you, but I left my crayons at home 🖍️",
      "You're like a cloud. When you disappear, it’s a good day ☁️",
      "If I wanted to kill myself, I’d climb your ego and jump to your IQ 💀",
      "You bring everyone so much joy... when you leave the room 🚪",
      "I’d agree with you, but then we’d both be wrong 😭",
      "You have something on your chin… no, the third one 😭",
      "You're the human version of a typo 💢",
      "Mirrors can’t talk — lucky for you, they can’t laugh either 💀",
      "I thought of you today. It reminded me to take out the trash 🗑️",
    ];

    const roast = roasts[Math.floor(Math.random() * roasts.length)];

    const embed = new EmbedBuilder()
      .setColor("#4db8ff")
      .setTitle("🔥 Roast Time / Heure du roast 🔥")
      .setDescription(`**${target.username}**, ${roast}`)
      .setFooter({ text: "Made by X1LLZ 💻 | discord.gg/hellz" });

    message.channel.send({ embeds: [embed] });
  },
};