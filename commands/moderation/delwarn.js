const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");
const path = require("path");

const warnPath = path.join(__dirname, "../../data/warnings.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("delwarn")
    .setDescription("Delete a specific warning from a user.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to remove warning from").setRequired(true)
    )
    .addIntegerOption((option) =>
      option.setName("number").setDescription("Warning number to delete").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const number = interaction.options.getInteger("number");

    if (!fs.existsSync(warnPath))
      return interaction.reply({ content: "No warnings file found.", ephemeral: true });

    const data = JSON.parse(fs.readFileSync(warnPath, "utf8"));
    const userWarnings = data[interaction.guild.id]?.[user.id];

    if (!userWarnings || number < 1 || number > userWarnings.length)
      return interaction.reply({
        content: "⚠️ Invalid warning number.",
        ephemeral: true,
      });

    userWarnings.splice(number - 1, 1);
    fs.writeFileSync(warnPath, JSON.stringify(data, null, 2));

    await interaction.reply({
      content: `🗑️ Deleted warning #${number} for **${user.tag}**.`,
    });
  },
};