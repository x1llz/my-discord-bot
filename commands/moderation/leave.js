const { SlashCommandBuilder } = require("discord.js");

const ownerId = "1187100546683899995";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Force the bot to leave a specific server (bot owner only).")
    .addStringOption((option) =>
      option.setName("serverid").setDescription("Server ID to leave").setRequired(true)
    )
    .setDMPermission(false),

  async execute(interaction) {
    if (interaction.user.id !== ownerId)
      return interaction.reply({
        content: "❌ Only the bot owner can use this command.",
        ephemeral: true,
      });

    const serverId = interaction.options.getString("serverid");
    const guild = interaction.client.guilds.cache.get(serverId);

    if (!guild)
      return interaction.reply({
        content: "⚠️ The bot is not in that server.",
        ephemeral: true,
      });

    try {
      await guild.leave();
      await interaction.reply({
        content: `🚪 Successfully left **${guild.name}** (${serverId}).`,
      });
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: "❌ Failed to leave the server.",
        ephemeral: true,
      });
    }
  },
};