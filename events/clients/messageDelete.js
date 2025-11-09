// events/client/messageDelete.js
const cache = new Map();

module.exports = {
  name: "messageDelete",
  async execute(message, client) {
    if (!message.guild || !message.author || message.author.bot) return;

    client.snipeCache = client.snipeCache || new Map();

    client.snipeCache.set(message.channel.id, {
      content: message.content || "[embed / attachment]",
      author: message.author.tag,
      time: Date.now(),
    });

    // Auto-remove after 5 minutes
    setTimeout(() => client.snipeCache.delete(message.channel.id), 5 * 60 * 1000);
  },
};