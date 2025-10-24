const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");
const path = require("path");
const profilePath = path.join(__dirname, "../../data/profile.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("givexp")
    .setDescription("Give XP to a user (admin only) ⚡")
    .addUserOption((opt) =>
      opt.setName("user").setDescription("User to give XP").setRequired(true)
    )
    .addIntegerOption((opt) =>
      opt.setName("amount").setDescription("XP amount").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const amount = interaction.options.getInteger("amount");

    if (!fs.existsSync(profilePath)) fs.writeFileSync(profilePath, JSON.stringify({}));
    const profiles = JSON.parse(fs.readFileSync(profilePath, "utf8"));

    if (!profiles[user.id])
      profiles[user.id] = { xp: 0, level: 1, prestige: 0, bio: "No bio yet" };

    profiles[user.id].xp += amount;
    fs.writeFileSync(profilePath, JSON.stringify(profiles, null, 2));

    await interaction.reply({
      content: `⚡ Gave **${amount} XP** to **${user.username}**.`,
    });
  },
};