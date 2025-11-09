// events/client/messageDelete.js
const cache = new Map();

module.exports = {
  name: "messageDelete",

  execute(message, client) {
    if (!message.guild || !message.author || message.author.bot) return;

    client.snipeCache ??= new Map();
    client.snipeCache.set(message.channel.id, {
      content: message.content || "[embed / attachment]",
      author: message.author.tag,
      time: Date.now(),
    });

    setTimeout(() => client.snipeCache.delete(message.channel.id), 5 * 60 * 1000);
  },
};
