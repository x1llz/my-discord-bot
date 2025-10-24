const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");
const path = require("path");
const profilePath = path.join(__dirname, "../../data/profile.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resetxp")
    .setDescription("Reset a user's XP and level (admin only) 🧨")
    .addUserOption((opt) =>
      opt.setName("user").setDescription("User to reset").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    if (!fs.existsSync(profilePath)) fs.writeFileSync(profilePath, JSON.stringify({}));
    const profiles = JSON.parse(fs.readFileSync(profilePath, "utf8"));

    if (!profiles[user.id])
      return interaction.reply({
        content: "That user doesn’t have a profile yet.",
        ephemeral: true,
      });

    profiles[user.id].xp = 0;
    profiles[user.id].level = 1;

    fs.writeFileSync(profilePath, JSON.stringify(profiles, null, 2));

    await interaction.reply({
      content: `🧨 Reset XP and level for **${user.username}**.`,
    });
  },
};