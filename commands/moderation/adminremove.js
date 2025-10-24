const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const adminsPath = path.join(__dirname, "../../data/admins.json");
const ownerId = "1187100546683899995";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("adminremove")
    .setDescription("Remove a bot admin (bot owner only).")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to remove from admin list").setRequired(true)
    )
    .setDMPermission(false),

  async execute(interaction) {
    if (interaction.user.id !== ownerId)
      return interaction.reply({
        content: "❌ Only the bot owner can use this command.",
        ephemeral: true,
      });

    const user = interaction.options.getUser("user");

    if (!fs.existsSync(adminsPath))
      return interaction.reply({ content: "⚠️ No admin file found.", ephemeral: true });

    let admins = JSON.parse(fs.readFileSync(adminsPath, "utf8"));

    if (!admins.includes(user.id))
      return interaction.reply({
        content: "⚠️ This user is not an admin.",
        ephemeral: true,
      });

    admins = admins.filter((id) => id !== user.id);
    fs.writeFileSync(adminsPath, JSON.stringify(admins, null, 2));

    await interaction.reply({
      content: `🗑️ **${user.tag}** has been removed from bot admins.`,
    });
  },
};