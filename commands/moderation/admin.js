const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const adminsPath = path.join(__dirname, "../../data/admins.json");
const ownerId = "1187100546683899995";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("admin")
    .setDescription("Add or remove a bot admin (owner only).")
    .addSubcommand((sub) =>
      sub
        .setName("add")
        .setDescription("Add a bot admin.")
        .addUserOption((option) =>
          option.setName("user").setDescription("User to make admin").setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("remove")
        .setDescription("Remove a bot admin.")
        .addUserOption((option) =>
          option.setName("user").setDescription("User to remove").setRequired(true)
        )
    )
    .setDMPermission(false),

  async execute(interaction) {
    if (interaction.user.id !== ownerId)
      return interaction.reply({
        content: "❌ Only the bot owner can manage admins.",
        ephemeral: true,
      });

    const sub = interaction.options.getSubcommand();
    const user = interaction.options.getUser("user");

    let admins = [];
    if (fs.existsSync(adminsPath))
      admins = JSON.parse(fs.readFileSync(adminsPath, "utf8"));

    if (sub === "add") {
      if (admins.includes(user.id))
        return interaction.reply({
          content: "⚠️ This user is already an admin.",
          ephemeral: true,
        });

      admins.push(user.id);
      fs.writeFileSync(adminsPath, JSON.stringify(admins, null, 2));
      return interaction.reply({
        content: `✅ **${user.tag}** has been added as a bot admin.`,
      });
    }

    if (sub === "remove") {
      if (!admins.includes(user.id))
        return interaction.reply({
          content: "⚠️ This user is not an admin.",
          ephemeral: true,
        });

      admins = admins.filter((id) => id !== user.id);
      fs.writeFileSync(adminsPath, JSON.stringify(admins, null, 2));
      return interaction.reply({
        content: `🗑️ **${user.tag}** has been removed from bot admins.`,
      });
    }
  },
};