const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "rolesinfo",
  description: "Show all roles in the server 📜 / Afficher tous les rôles du serveur 📜",
  async execute(message) {
    const roles = message.guild.roles.cache
      .filter(r => r.name !== "@everyone")
      .sort((a, b) => b.position - a.position)
      .map(r => r.toString())
      .join(", ");

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("📜 Server Roles / Rôles du serveur")
      .setDescription(roles || "No roles found / Aucun rôle trouvé")
      .setFooter({ text: `Requested by ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};