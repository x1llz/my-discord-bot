const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dig")
    .setDescription("Dig the ground for hidden treasures 🪓"),

  async execute(interaction) {
    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    const data = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const userId = interaction.user.id;
    if (!data[userId]) data[userId] = { coins: 0, lastDig: 0 };

    const now = Date.now();
    const cooldown = 600000; // 10 min
    const diff = now - data[userId].lastDig;
    if (diff < cooldown)
      return interaction.reply({
        content: "🪓 The ground’s too hard right now. Try later.",
        ephemeral: true,
      });

    const treasures = [
      { name: "💀 Old Bone", value: 100 },
      { name: "🪙 Ancient Coin", value: 350 },
      { name: "📜 Lost Map", value: 500 },
      { name: "⚱️ Golden Vase", value: 800 },
      { name: "💎 Jewel", value: 1000 },
    ];
    const find = treasures[Math.floor(Math.random() * treasures.length)];
    const reward = find.value;

    data[userId].coins += reward;
    data[userId].lastDig = now;
    fs.writeFileSync(coinsPath, JSON.stringify(data, null, 2));

    const embed = new EmbedBuilder()
      .setColor("Gold")
      .setTitle("🪓 Dig Results")
      .setDescription(`You dug up a **${find.name}** worth **${reward} coins!**`);

    await interaction.reply({ embeds: [embed] });
  },
};