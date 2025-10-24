const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");
const toolsPath = path.join(__dirname, "../../data/tools.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("useshovel")
    .setDescription("Use your shovel to dig treasures 🪓"),

  async execute(interaction) {
    if (!fs.existsSync(toolsPath)) fs.writeFileSync(toolsPath, JSON.stringify({}));
    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));

    const tools = JSON.parse(fs.readFileSync(toolsPath, "utf8"));
    const coins = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const userId = interaction.user.id;

    if (!tools[userId] || !tools[userId].shovel)
      return interaction.reply({
        content: "❌ You don’t own a shovel.",
        ephemeral: true,
      });

    const tool = tools[userId].shovel;
    if (tool.durability <= 0)
      return interaction.reply({
        content: "💀 Your shovel is broken. Repair it with `/repair`.",
        ephemeral: true,
      });

    const treasures = [
      { name: "💀 Bone", value: 100 },
      { name: "🪙 Coin Pouch", value: 300 },
      { name: "⚱️ Golden Jar", value: 700 },
      { name: "💎 Gemstone", value: 1000 },
    ];
    const find = treasures[Math.floor(Math.random() * treasures.length)];
    const bonus = Math.random() < 0.1 ? 500 : 0;
    const reward = find.value + bonus;

    if (!coins[userId]) coins[userId] = { coins: 0, lastDaily: 0 };
    coins[userId].coins += reward;
    tool.durability -= 1;

    fs.writeFileSync(coinsPath, JSON.stringify(coins, null, 2));
    fs.writeFileSync(toolsPath, JSON.stringify(tools, null, 2));

    const embed = new EmbedBuilder()
      .setColor("Gold")
      .setTitle("🪓 Digging Results")
      .setDescription(
        bonus
          ? `🎉 You found a **${find.name}** and a rare relic worth **${reward} coins!**`
          : `You dug up a **${find.name}** worth **${find.value} coins.**`
      )
      .setFooter({ text: `Durability left: ${tool.durability}/20` });

    await interaction.reply({ embeds: [embed] });
  },
};