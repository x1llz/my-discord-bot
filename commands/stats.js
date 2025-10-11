module.exports = {
  name: "stats",
  description: "Show user message stats.",
  async execute(message) {
    // Placeholder - real message tracking would need a DB
    message.reply(`📊 ${message.author.username} has sent 123 messages (demo stat).`);
  },
};
