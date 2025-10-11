const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "giveaway",
  description: "Create a giveaway with UI setup.",
  async execute(message, args) {
    if (!message.member.permissions.has("ManageGuild"))
      return message.reply("❌ You can't use this command.");

    const embed = new EmbedBuilder()
      .setTitle("🎉 Giveaway Setup")
      .setDescription("Feature under construction: soon interactive UI setup.")
      .setColor("#FF69B4");

    message.reply({ embeds: [embed] });
  },
};
