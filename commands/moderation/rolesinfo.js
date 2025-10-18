const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "rolesinfo",
  description: "Show all roles in the server 🧾",
  async execute(message) {
    const roles = message.guild.roles.cache
      .filter((r) => r.name !== "@everyone")
      .map((r) => r.name)
      .join(", ");

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("📜 Server Roles")
      .setDescription(roles || "No roles found.")
      .setFooter({ text: `${message.guild.name}` });

    message.channel.send({ embeds: [embed] });
  },
};