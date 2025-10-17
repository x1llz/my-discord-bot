const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "mods",
  description: "Show moderators list 👑 / Affiche la liste des modérateurs 👑",
  async execute(message) {
    const mods = message.guild.members.cache
      .filter(m => m.permissions.has("KickMembers") || m.permissions.has("BanMembers"))
      .map(m => m.user.tag);

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("👑 Server Moderators / Modérateurs du serveur")
      .setDescription(mods.length ? mods.join("\n") : "❌ No moderators found / Aucun modérateur trouvé.")
      .setFooter({ text: `Requested by ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};