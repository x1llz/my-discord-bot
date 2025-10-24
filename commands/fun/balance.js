const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Check your coin balance or another user's 💳")
    .addUserOption((opt) =>
      opt.setName("user").setDescription("User to check balance of").setRequired(false)
    ),

  async execute(interaction) {
    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    const data = JSON.parse(fs.readFileSync(coinsPath, "utf8"));

    const user = interaction.options.getUser("user") || interaction.user;
    if (!data[user.id]) data[user.id] = { coins: 0, lastDaily: 0 };

    const embed = new EmbedBuilder()
      .setColor("Gold")
      .setTitle(`💳 Balance`)
      .setDescription(`**${user.username}** has **${data[user.id].coins} coins**.`);

    await interaction.reply({ embeds: [embed] });
  },
};