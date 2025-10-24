const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const profilePath = path.join(__dirname, "../../data/profile.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("levelup")
    .setDescription("Manually level up by spending XP ⭐")
    .addIntegerOption((opt) =>
      opt
        .setName("amount")
        .setDescription("How many XP points to spend")
        .setRequired(true)
    ),

  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");
    if (amount <= 0)
      return interaction.reply({ content: "❌ Invalid XP amount.", ephemeral: true });

    if (!fs.existsSync(profilePath)) fs.writeFileSync(profilePath, JSON.stringify({}));
    const profiles = JSON.parse(fs.readFileSync(profilePath, "utf8"));
    const userId = interaction.user.id;

    if (!profiles[userId])
      profiles[userId] = { xp: 0, level: 1, prestige: 0, bio: "No bio yet" };

    const p = profiles[userId];
    const cost = p.level * 100;

    if (p.xp < cost)
      return interaction.reply({
        content: `💀 You need **${cost} XP** to level up (you have ${p.xp}).`,
        ephemeral: true,
      });

    p.xp -= cost;
    p.level++;
    fs.writeFileSync(profilePath, JSON.stringify(profiles, null, 2));

    await interaction.reply({
      content: `⭐ You leveled up to **Level ${p.level}!**`,
    });
  },
};