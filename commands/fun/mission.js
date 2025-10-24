const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mission")
    .setDescription("Get a random mission to complete for coins 🎯"),

  async execute(interaction) {
    const missions = [
      { desc: "Send 10 messages in chat 💬", reward: 300 },
      { desc: "Win a game of /bet 🪙", reward: 500 },
      { desc: "Use /fish 3 times 🎣", reward: 400 },
      { desc: "Earn 1000 XP 📈", reward: 800 },
    ];
    const mission = missions[Math.floor(Math.random() * missions.length)];

    const embed = new EmbedBuilder()
      .setColor("Purple")
      .setTitle("🎯 New Mission")
      .setDescription(`${mission.desc}\n\n💰 Reward: **${mission.reward} coins**`);

    await interaction.reply({ embeds: [embed] });
  },
};