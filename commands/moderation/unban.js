// commands/moderation/unban.js
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a user by ID")
    .addStringOption(opt =>
      opt.setName("user_id").setDescription("User ID to unban").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const userId = interaction.options.getString("user_id");
    try {
      await interaction.guild.members.unban(userId);
      await interaction.reply({ content: `✅ User <@${userId}> has been unbanned.`, ephemeral: false });
    } catch {
      await interaction.reply({ content: "❌ Invalid ID or user not banned.", ephemeral: true });
    }
  },
};
