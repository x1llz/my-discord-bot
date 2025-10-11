const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "rolesinfo",
  description: "List all server roles.",
  async execute(message) {
    const roles = message.guild.roles.cache.map(r => r.name).join(", ");
    const embed = new EmbedBuilder()
      .setTitle("🎭 Server Roles")
      .setDescription(roles || "No roles found.")
      .setColor("#FF69B4");

    message.reply({ embeds: [embed] });
  },
};
