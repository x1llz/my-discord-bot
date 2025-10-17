const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "serverinfo",
  description: "Show server info 🏠 / Afficher les infos du serveur 🏠",
  async execute(message) {
    const { guild } = message;

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle(`🏠 Server Info — ${guild.name}`)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields(
        { name: "👑 Owner", value: `<@${guild.ownerId}>`, inline: true },
        { name: "👥 Members", value: `${guild.memberCount}`, inline: true },
        { name: "💬 Channels", value: `${guild.channels.cache.size}`, inline: true },
        { name: "📆 Created", value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true }
      )
      .setFooter({ text: `Requested by ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};