const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const invPath = path.join(__dirname, "../../data/inventory.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("giveitem")
    .setDescription("Give an item to another user 🎁")
    .addUserOption((opt) =>
      opt.setName("user").setDescription("User to receive the item").setRequired(true)
    )
    .addStringOption((opt) =>
      opt.setName("item").setDescription("Item name").setRequired(true)
    )
    .addIntegerOption((opt) =>
      opt.setName("amount").setDescription("Amount to give").setRequired(true)
    ),

  async execute(interaction) {
    const receiver = interaction.options.getUser("user");
    const item = interaction.options.getString("item");
    const amount = interaction.options.getInteger("amount");
    const giver = interaction.user.id;

    if (receiver.id === giver)
      return interaction.reply({ content: "You can’t give items to yourself 💀", ephemeral: true });

    if (!fs.existsSync(invPath)) fs.writeFileSync(invPath, JSON.stringify({}));
    const inv = JSON.parse(fs.readFileSync(invPath, "utf8"));

    if (!inv[giver] || !inv[giver][item] || inv[giver][item] < amount)
      return interaction.reply({
        content: "❌ You don’t have enough of that item.",
        ephemeral: true,
      });

    if (!inv[receiver.id]) inv[receiver.id] = {};
    inv[giver][item] -= amount;
    if (inv[giver][item] <= 0) delete inv[giver][item];
    if (!inv[receiver.id][item]) inv[receiver.id][item] = 0;
    inv[receiver.id][item] += amount;

    fs.writeFileSync(invPath, JSON.stringify(inv, null, 2));

    await interaction.reply({
      content: `🎁 You gave **${amount}x ${item}** to **${receiver.username}**.`,
    });
  },
};