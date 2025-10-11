const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "mods",
  description: "List all moderators.",
  async execute(message) {
    const mods = message.guild.members.cache.filter(m => m.permissions.has("ManageMessages"));
    const embed = new EmbedBuilder()
      .setTitle("🛡️ Server Moderators")
      .setDescription(mods.map(m => m.user.tag).join("\n") || "No mods found.")
      .setColor("#FFD700");
    message.reply({ embeds: [embed] });
  },
};
