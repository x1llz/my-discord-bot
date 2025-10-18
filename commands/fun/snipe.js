const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "snipe",
  description: "Show the last deleted message 🔫",
  async execute(message, args, client) {
    const snipe = client.snipes.get(message.channel.id);
    if (!snipe) return message.reply("There's nothing to snipe!");

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setAuthor({ name: snipe.author.tag, iconURL: snipe.author.displayAvatarURL() })
      .setDescription(snipe.content || "*[No text message]*")
      .setFooter({ text: new Date(snipe.time).toLocaleString() });

    if (snipe.image) embed.setImage(snipe.image);

    message.channel.send({ embeds: [embed] });
  },
};