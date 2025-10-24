const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");
const path = require("path");

const blacklistPath = path.join(__dirname, "../../data/blacklist.json");
const ownerId = "1187100546683899995";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("blacklist")
    .setDescription("Blacklist a server permanently (bot owner only).")
    .addStringOption((option) =>
      option.setName("serverid").setDescription("Server ID to blacklist").setRequired(true)
    )
    .setDMPermission(false),

  async execute(interaction) {
    if (interaction.user.id !== ownerId)
      return interaction.reply({
        content: "❌ Only the bot owner can use this command.",
        ephemeral: true,
      });

    const serverId = interaction.options.getString("serverid");

    let blacklist = [];
    if (fs.existsSync(blacklistPath)) {
      blacklist = JSON.parse(fs.readFileSync(blacklistPath, "utf8"));
    }

    if (blacklist.includes(serverId))
      return interaction.reply({ content: "⚠️ This server is already blacklisted.", ephemeral: true });

    blacklist.push(serverId);
    fs.writeFileSync(blacklistPath, JSON.stringify(blacklist, null, 2));

    await interaction.reply({ content: `🚫 Server **${serverId}** has been blacklisted.` });

    const guild = interaction.client.guilds.cache.get(serverId);
    if (guild) await guild.leave();
  },
};