const { EmbedBuilder } = require("discord.js");
const os = require("os");

module.exports = {
  name: "stats",
  description: "Show bot statistics 📊",
  async execute(message, args, client) {
    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("📊 Hellz Bot Statistics")
      .addFields(
        { name: "🧠 Servers", value: `${client.guilds.cache.size}`, inline: true },
        { name: "👥 Users", value: `${client.users.cache.size}`, inline: true },
        { name: "⚙️ Node.js", value: process.version, inline: true },
        { name: "💻 Platform", value: os.platform(), inline: true },
        { name: "⏱️ Uptime", value: `${Math.floor(process.uptime() / 60)}m`, inline: true }
      )
      .setFooter({ text: "Made by X1LLZ | discord.gg/hellz" });

    message.channel.send({ embeds: [embed] });
  },
};