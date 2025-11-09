// commands/owner/leave.js
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Force the bot to leave a server (owner only)")
    .addStringOption(opt =>
      opt.setName("server_id").setDescription("Server ID to leave").setRequired(true)
    ),

  async execute(interaction) {
    const ownerId = "1187100546683899995";
    if (interaction.user.id !== ownerId)
      return interaction.reply({ content: "❌ You are not authorized to use this command.", ephemeral: true });

    const serverId = interaction.options.getString("server_id");
    const guild = interaction.client.guilds.cache.get(serverId);

    if (!guild)
      return interaction.reply({ content: "❌ I’m not in that server or invalid ID.", ephemeral: true });

    await guild.leave();
    await interaction.reply({ content: `✅ Successfully left **${guild.name}** (${guild.id}).`, ephemeral: false });
  },
};
