const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} = require("discord.js");
const fs = require("fs");
const path = require("path");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("trade")
    .setDescription("Start a coin trade with another user 💰")
    .addUserOption((opt) =>
      opt.setName("user").setDescription("User to trade with").setRequired(true)
    )
    .addIntegerOption((opt) =>
      opt.setName("amount").setDescription("Amount of coins to trade").setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const amount = interaction.options.getInteger("amount");
    const sender = interaction.user;

    if (user.id === sender.id)
      return interaction.reply({ content: "You can’t trade with yourself 💀", ephemeral: true });

    if (amount <= 0)
      return interaction.reply({ content: "Invalid trade amount.", ephemeral: true });

    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));
    const data = JSON.parse(fs.readFileSync(coinsPath, "utf8"));

    if (!data[sender.id] || data[sender.id].coins < amount)
      return interaction.reply({ content: "💀 Not enough coins to trade.", ephemeral: true });

    const embed = new EmbedBuilder()
      .setColor("Gold")
      .setTitle("💰 Trade Request")
      .setDescription(`**${sender.username}** wants to trade **${amount} coins** with **${user.username}**.`);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("accept_trade").setLabel("Accept").setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId("decline_trade").setLabel("Decline").setStyle(ButtonStyle.Danger)
    );

    const msg = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });

    const collector = msg.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 30000,
    });

    collector.on("collect", async (i) => {
      if (i.user.id !== user.id)
        return i.reply({ content: "This trade isn’t for you.", ephemeral: true });

      if (i.customId === "accept_trade") {
        if (!data[user.id]) data[user.id] = { coins: 0, lastDaily: 0 };

        data[sender.id].coins -= amount;
        data[user.id].coins += amount;
        fs.writeFileSync(coinsPath, JSON.stringify(data, null, 2));

        await i.update({
          embeds: [new EmbedBuilder().setColor("Green").setDescription(`✅ Trade successful! ${sender.username} → ${user.username} (**${amount} coins**)`)],
          components: [],
        });
      } else {
        await i.update({
          embeds: [new EmbedBuilder().setColor("Red").setDescription(`❌ Trade declined by ${user.username}.`)],
          components: [],
        });
      }
    });
  },
};