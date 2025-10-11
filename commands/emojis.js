module.exports = {
  name: "emojis",
  description: "List all emojis from the server.",
  async execute(message) {
    const emojis = message.guild.emojis.cache.map(e => e.toString()).join(" ");
    message.reply(emojis || "😢 No emojis found.");
  },
};
