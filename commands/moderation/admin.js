// commands/moderation/admin.js
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");
const path = require("path");
const adminsFile = path.join(__dirname, "../../data/admins.json");

if (!fs.existsSync(adminsFile)) fs.writeFileSync(adminsFile, JSON.stringify([]));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("admin")
    .setDescription("Add a user as bot admin (owner only)")
    .addUserOption(opt => opt.setName("user").setDescription("User to add as admin").setRequired(true)),

  async execute(interaction) {
    const ownerId = "1187100546683899995";
    if (interaction.user.id !== ownerId)
      return interaction.reply({ content: "❌ You are not authorized to use this command.", ephemeral: true });

    const user = interaction.options.getUser("user");
    const admins = JSON.parse(fs.readFileSync(adminsFile));

    if (admins.includes(user.id))
      return interaction.reply({ content: `${user.tag} is already an admin.`, ephemeral: true });

    admins.push(user.id);
    fs.writeFileSync(adminsFile, JSON.stringify(admins, null, 2));

    await interaction.reply({ content: `✅ ${user.tag} has been added as bot admin.`, ephemeral: false });
  },
};
