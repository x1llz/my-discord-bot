const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Check the bot's latency / Vérifie la latence du bot ⚡",

  async execute(message) {
    const ping = Date.now() - message.createdTimestamp;
    const apiPing = message.client.ws.ping;

    const embed = new EmbedBuilder()
      .setColor("#4db8ff")
      .setTitle("🏓 Hellz Ping Monitor")
      .setDescription(
        `🇫🇷 **Latence du bot :** \`${ping}ms\`\n` +
        `🇬🇧 **Bot latency:** \`${ping}ms\`\n\n` +
        `🇫🇷 **Latence API Discord :** \`${apiPing}ms\`\n` +
        `🇬🇧 **Discord API latency:** \`${apiPing}ms\`\n`
      )
      .setImage("https://cdn.discordapp.com/attachments/1282973133931542551/1283924672933134458/Hellz_Banner.png")
      .setFooter({
        text: "Made by X1LLZ 💻 | discord.gg/hellz",
        iconURL: message.client.user.displayAvatarURL(),
      })
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
  },
};