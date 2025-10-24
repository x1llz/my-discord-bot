const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");
const toolsPath = path.join(__dirname, "../../data/tools.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userifle")
    .setDescription("Use your rifle to hunt animals 🏹"),

  async execute(interaction) {
    if (!fs.existsSync(toolsPath)) fs.writeFileSync(toolsPath, JSON.stringify({}));
    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));

    const tools = JSON.parse(fs.readFileSync(toolsPath, "utf8"));
    const coins = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const userId = interaction.user.id;

    if (!tools[userId] || !tools[userId].rifle)
      return interaction.reply({
        content: "❌ You don’t own a rifle.",
        ephemeral: true,
      });

    const tool = tools[userId].rifle;
    if (tool.durability <= 0)
      return interaction.reply({
        content: "💀 Your rifle is broken. Repair it with `/repair`.",
        ephemeral: true,
      });

    const animals = [
      { name: "🐇 Rabbit", value: 200 },
      { name: "🦌 Deer", value: 400 },
      { name: "🐻 Bear", value: 700 },
      { name: "🦅 Eagle", value: 500 },
    ];
    const hunted = animals[Math.floor(Math.random() * animals.length)];
    const bonus = Math.random() < 0.1 ? 800 : 0;
    const reward = hunted.value + bonus;

    if (!coins[userId]) coins[userId] = { coins: 0, lastDaily: 0 };
    coins[userId].coins += reward;
    tool.durability -= 1;

    fs.writeFileSync(coinsPath, JSON.stringify(coins, null, 2));
    fs.writeFileSync(toolsPath, JSON.stringify(tools, null, 2));

    const embed = new EmbedBuilder()
      .setColor("Brown")
      .setTitle("🏹 Hunting Results")
      .setDescription(
        bonus
          ? `🎯 You hunted a **${hunted.name}** and found a rare pelt worth **${reward} coins!**`
          : `You hunted a **${hunted.name}** worth **${hunted.value} coins.**`
      )
      .setFooter({ text: `Durability left: ${tool.durability}/20` });

    await interaction.reply({ embeds: [embed] });
  },
};