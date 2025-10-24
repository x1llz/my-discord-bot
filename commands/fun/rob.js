const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rob")
    .setDescription("Attempt to rob another user 🕵️")
    .addUserOption((opt) =>
      opt.setName("user").setDescription("Target to rob").setRequired(true)
    ),

  async execute(interaction) {
    const thief = interaction.user;
    const victim = interaction.options.getUser("user");

    if (victim.id === thief.id)
      return interaction.reply({ content: "You can’t rob yourself 😭", ephemeral: true });

    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    const data = JSON.parse(fs.readFileSync(coinsPath, "utf8"));

    if (!data[thief.id]) data[thief.id] = { coins: 0, lastRob: 0 };
    if (!data[victim.id]) data[victim.id] = { coins: 0, lastDaily: 0 };

    const now = Date.now();
    const cooldown = 7200000; // 2 hours
    const diff = now - data[thief.id].lastRob;

    if (diff < cooldown)
      return interaction.reply({
        content: "⏳ Chill thief, you can rob again later.",
        ephemeral: true,
      });

    if (data[victim.id].coins < 200)
      return interaction.reply({
        content: "💀 That user too broke to rob.",
        ephemeral: true,
      });

    const success = Math.random() < 0.45;
    const amount = Math.floor(Math.random() * 150) + 50;

    data[thief.id].lastRob = now;

    if (success) {
      data[victim.id].coins -= amount;
      data[thief.id].coins += amount;
      fs.writeFileSync(coinsPath, JSON.stringify(data, null, 2));

      await interaction.reply(
        `🕵️ You successfully robbed **${victim.username}** and stole **${amount} coins!**`
      );
    } else {
      const fine = Math.floor(amount / 2);
      data[thief.id].coins = Math.max(0, data[thief.id].coins - fine);
      fs.writeFileSync(coinsPath, JSON.stringify(data, null, 2));

      await interaction.reply(
        `🚨 You got caught trying to rob **${victim.username}** and lost **${fine} coins** in fines.`
      );
    }
  },
};