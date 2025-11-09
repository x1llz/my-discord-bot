// commands/moderation/modlogs.js
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const modlogsFile = path.join(__dirname, "../../data/modlogs.json");

if (!fs.existsSync(modlogsFile)) fs.writeFileSync(modlogsFile, JSON.stringify({}));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("modlogs")
    .setDescription("Show moderation logs for a user")
    .addUserOption(opt =>
      opt.setName("user").setDescription("User to view logs for").setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const logs = JSON.parse(fs.readFileSync(modlogsFile));

    const userLogs = logs[user.id] || [];

    if (userLogs.length === 0)
      return interaction.reply({ content: "⚠️ No moderation logs for this user.", ephemeral: true });

    const embed = new EmbedBuilder()
      .setColor("#00BFFF")
      .setTitle(`🧾 Mod Logs for ${user.tag}`)
      .setDescription(userLogs.map((l, i) => `**${i + 1}.** ${l.action} — ${l.reason}`).join("\n"))
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
