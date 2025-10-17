const { EmbedBuilder } = require("discord.js");
const os = require("os");

module.exports = {
  name: "botinfo",
  description: "Display bot information 🤖",
  async execute(message) {
    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🤖 Hellz Bot Information")
      .addFields(
        { name: "💡 Developer", value: "Made by X1LLZ", inline: true },
        { name: "🌐 Support", value: "[discord.gg/hellz](https://discord.gg/hellz)", inline: true },
        { name: "🧠 Memory Usage", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
        { name: "🏠 Servers", value: `${message.client.guilds.cache.size}`, inline: true },
        { name: "👥 Users", value: `${message.client.users.cache.size}`, inline: true },
        { name: "💻 Platform", value: os.type(), inline: true },
      )
      .setFooter({ text: "Made by X1LLZ 💻 | discord.gg/hellz" })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};