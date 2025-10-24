const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pay")
    .setDescription("Send coins to another user 💸")
    .addUserOption((opt) =>
      opt.setName("user").setDescription("Who do you want to pay?").setRequired(true)
    )
    .addIntegerOption((opt) =>
      opt.setName("amount").setDescription("How many coins to send").setRequired(true)
    ),

  async execute(interaction) {
    const sender = interaction.user;
    const receiver = interaction.options.getUser("user");
    const amount = interaction.options.getInteger("amount");

    if (receiver.id === sender.id)
      return interaction.reply({ content: "You can’t pay yourself 💀", ephemeral: true });
    if (amount <= 0)
      return interaction.reply({ content: "Invalid amount.", ephemeral: true });

    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    const data = JSON.parse(fs.readFileSync(coinsPath, "utf8"));

    if (!data[sender.id]) data[sender.id] = { coins: 0, lastDaily: 0 };
    if (!data[receiver.id]) data[receiver.id] = { coins: 0, lastDaily: 0 };

    if (data[sender.id].coins < amount)
      return interaction.reply({ content: "You don’t have enough coins 😭", ephemeral: true });

    data[sender.id].coins -= amount;
    data[receiver.id].coins += amount;

    fs.writeFileSync(coinsPath, JSON.stringify(data, null, 2));

    await interaction.reply({
      content: `✅ You sent **${amount} coins** to **${receiver.username}**.`,
    });
  },
};