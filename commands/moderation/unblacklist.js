const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const blacklistPath = path.join(__dirname, "../../data/blacklist.json");
const ownerId = "1187100546683899995";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unblacklist")
    .setDescription("Remove a server from the blacklist (bot owner only).")
    .addStringOption((option) =>
      option.setName("serverid").setDescription("Server ID to remove").setRequired(true)
    )
    .setDMPermission(false),

  async execute(interaction) {
    if (interaction.user.id !== ownerId)
      return interaction.reply({
        content: "❌ Only the bot owner can use this command.",
        ephemeral: true,
      });

    const serverId = interaction.options.getString("serverid");

    if (!fs.existsSync(blacklistPath))
      return interaction.reply({
        content: "⚠️ No blacklist file found.",
        ephemeral: true,
      });

    let blacklist = JSON.parse(fs.readFileSync(blacklistPath, "utf8"));

    if (!blacklist.includes(serverId))
      return interaction.reply({
        content: "⚠️ This server is not blacklisted.",
        ephemeral: true,
      });

    blacklist = blacklist.filter((id) => id !== serverId);
    fs.writeFileSync(blacklistPath, JSON.stringify(blacklist, null, 2));

    await interaction.reply({
      content: `✅ Server **${serverId}** has been removed from the blacklist.`,
    });
  },
};