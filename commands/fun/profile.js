const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const profilePath = path.join(__dirname, "../../data/profile.json");
const coinsPath = path.join(__dirname, "../../data/coins.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("Show your Hellz profile or someone else’s 🪪")
    .addUserOption((opt) =>
      opt.setName("user").setDescription("User to show").setRequired(false)
    ),

  async execute(interaction) {
    if (!fs.existsSync(profilePath)) fs.writeFileSync(profilePath, JSON.stringify({}));
    if (!fs.existsSync(coinsPath)) fs.writeFileSync(coinsPath, JSON.stringify({}));

    const user = interaction.options.getUser("user") || interaction.user;
    const profiles = JSON.parse(fs.readFileSync(profilePath, "utf8"));
    const coins = JSON.parse(fs.readFileSync(coinsPath, "utf8"));

    if (!profiles[user.id])
      profiles[user.id] = { xp: 0, level: 1, prestige: 0, bio: "No bio set yet." };
    if (!coins[user.id]) coins[user.id] = { coins: 0, lastDaily: 0 };

    const p = profiles[user.id];
    const c = coins[user.id];

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle(`🪪 ${user.username}'s Profile`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: "💰 Coins", value: `${c.coins}`, inline: true },
        { name: "⭐ Level", value: `${p.level}`, inline: true },
        { name: "⚡ XP", value: `${p.xp}`, inline: true },
        { name: "🏆 Prestige", value: `${p.prestige}`, inline: true },
        { name: "🗒️ Bio", value: p.bio || "No bio set.", inline: false }
      );

    await interaction.reply({ embeds: [embed] });
    fs.writeFileSync(profilePath, JSON.stringify(profiles, null, 2));
  },
};