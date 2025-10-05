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
};
