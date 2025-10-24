const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("donate")
    .setDescription("Donate coins to a user (no refund) 💸")
    .addUserOption((opt) =>
      opt.setName("user").setDescription("User to donate to").setRequired(true)
    )
    .addIntegerOption((opt) =>
      opt.setName("amount").setDescription("Amount to donate").setRequired(true)
    ),

  async execute(interaction) {
    const receiver = interaction.options.getUser("user");
    const amount = interaction.options.getInteger("amount");
    const sender = interaction.user.id;

    if (receiver.id === sender)
      return interaction.reply({ content: "You can’t donate to yourself 💀", ephemeral: true });
    if (amount <= 0)
      return interaction.reply({ content: "Invalid donation amount.", ephemeral: true });

    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    const data = JSON.parse(fs.readFileSync(coinsPath, "utf8"));

    if (!data[sender] || data[sender].coins < amount)
      return interaction.reply({ content: "💀 Not enough coins.", ephemeral: true });

    if (!data[receiver.id]) data[receiver.id] = { coins: 0, lastDaily: 0 };

    data[sender].coins -= amount;
    data[receiver.id].coins += amount;

    fs.writeFileSync(coinsPath, JSON.stringify(data, null, 2));

    await interaction.reply({
      content: `🤝 You donated **${amount} coins** to **${receiver.username}**.`,
    });
  },
};