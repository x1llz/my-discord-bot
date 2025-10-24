const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const profilePath = path.join(__dirname, "../../data/profile.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setbio")
    .setDescription("Set your custom profile bio 🗒️")
    .addStringOption((opt) =>
      opt
        .setName("text")
        .setDescription("Your new bio text")
        .setRequired(true)
    ),

  async execute(interaction) {
    const bio = interaction.options.getString("text").slice(0, 120);

    if (!fs.existsSync(profilePath)) fs.writeFileSync(profilePath, JSON.stringify({}));
    const profiles = JSON.parse(fs.readFileSync(profilePath, "utf8"));
    const userId = interaction.user.id;

    if (!profiles[userId])
      profiles[userId] = { xp: 0, level: 1, prestige: 0, bio: "No bio set yet." };

    profiles[userId].bio = bio;
    fs.writeFileSync(profilePath, JSON.stringify(profiles, null, 2));

    await interaction.reply({
      content: `✅ Bio updated successfully!\n🗒️ **"${bio}"**`,
    });
  },
};