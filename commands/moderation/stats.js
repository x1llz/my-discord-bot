const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "stats",
  description: "Show bot and server stats 📊 / Afficher les statistiques 📊",
  async execute(message, args, client) {
    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("📊 Hellz Bot Statistics / Statistiques du bot")
      .addFields(
        { name: "🧠 Servers", value: `${client.guilds.cache.size}`, inline: true },
        { name: "👥 Users", value: `${client.users.cache.size}`, inline: true },
        { name: "💬 Channels", value: `${client.channels.cache.size}`, inline: true },
        { name: "⚡ Ping", value: `${client.ws.ping}ms`, inline: true }
      )
      .setFooter({ text: "Made by X1LLZ 💻 | discord.gg/hellz" })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};