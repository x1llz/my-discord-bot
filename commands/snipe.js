<<<<<<< HEAD
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "snipe",
  description: "Show last deleted message in this channel.",
  async execute(message, args, client) {
    const snipe = client.snipes.get(message.channel.id);
    if (!snipe) return message.reply("❌ There's nothing to snipe in this channel.");

    const embed = new EmbedBuilder()
      .setAuthor({ name: snipe.author.tag, iconURL: snipe.author.displayAvatarURL({ dynamic: true }) })
      .setDescription(snipe.content || "‎(embed only / attachment only)")
      .setColor("DarkBlue")
      .setFooter({ text: `Deleted • ${new Date(snipe.time).toLocaleString()}` });

    if (snipe.image) embed.setImage(snipe.image);

    return message.reply({ embeds: [embed] });
  },
=======
// === SNIPE COMMAND ===
let snipeData = {}; // On garde ici le dernier message supprimé pour chaque salon

module.exports = {
  name: "snipe",
  description: "Snipe the last deleted message in this channel.",
  
  async execute(message) {
    const sniped = snipeData[message.channel.id];
    
    if (!sniped) {
      return message.reply("❌ There's nothing to snipe here...");
    }

    const { authorTag, content, time } = sniped;
    const embed = {
      color: 0xff4b4b,
      title: "💥 Message Sniped!",
      fields: [
        { name: "👤 Author", value: authorTag, inline: true },
        { name: "🕒 Deleted", value: `<t:${Math.floor(time / 1000)}:R>`, inline: true },
      ],
      description: `🗨️ **Message:**\n${content || "_No text content (maybe an image or embed)_"}`
    };

    message.channel.send({ embeds: [embed] });
  },

  // Cette fonction permet de stocker les messages supprimés
  onDelete(message) {
    if (message.author?.bot) return;
    snipeData[message.channel.id] = {
      content: message.content,
      authorTag: message.author.tag,
      time: Date.now()
    };
  }
>>>>>>> bc39ee4acadc7aea05e1de60c118c05a19a7c06d
};
