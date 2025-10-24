const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("crime")
    .setDescription("Commit a crime and hope you don’t get caught 🕵️‍♂️"),

  async execute(interaction) {
    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    const data = JSON.parse(fs.readFileSync(coinsPath, "utf8"));
    const userId = interaction.user.id;

    if (!data[userId]) data[userId] = { coins: 0, lastCrime: 0 };

    const now = Date.now();
    const cooldown = 600000; // 10 min
    const diff = now - data[userId].lastCrime;

    if (diff < cooldown)
      return interaction.reply({
        content: "🚔 You just got out of jail, chill for a bit.",
        ephemeral: true,
      });

    const success = Math.random() < 0.5;
    const outcomes = [
      "robbed a store",
      "hacked a crypto wallet",
      "stole a car",
      "scammed an NPC",
      "sold fake Hellz coins",
    ];
    const action = outcomes[Math.floor(Math.random() * outcomes.length)];

    let msg;
    if (success) {
      const gain = Math.floor(Math.random() * 500) + 200;
      data[userId].coins += gain;
      msg = `🕵️ You ${action} and made **${gain} coins!**`;
    } else {
      const fine = Math.floor(Math.random() * 250) + 100;
      data[userId].coins = Math.max(0, data[userId].coins - fine);
      msg = `🚓 You got caught trying to ${action} and paid **${fine} coins** in fines.`;
    }

    data[userId].lastCrime = now;
    fs.writeFileSync(coinsPath, JSON.stringify(data, null, 2));

    await interaction.reply({ content: msg });
  },
};