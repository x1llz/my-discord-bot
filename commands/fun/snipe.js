const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "snipe",
  description: "Retrieve the last deleted message 👀 / Récupère le dernier message supprimé 👀",
  async execute(message, args, client) {
    const sniped = client.snipes.get(message.channel.id);
    if (!sniped)
      return message.reply("❌ No recently deleted message / Aucun message supprimé récemment");

    const embed = new EmbedBuilder()
      .setColor("#4db8ff")
      .setAuthor({ name: sniped.author.tag, iconURL: sniped.author.displayAvatarURL() })
      .setDescription(sniped.content || "*No text message / Aucun texte*")
      .setImage(sniped.image)
      .setFooter({ text: `🕒 ${new Date(sniped.time).toLocaleTimeString()}` });

    message.channel.send({ embeds: [embed] });
  },
};