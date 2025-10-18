export default {
  name: "emojis",
  description: "List all emojis in the server.",
  async execute(message) {
    const emojis = message.guild.emojis.cache.map(e => e.toString()).join(" ");
    message.channel.send(emojis || "❌ No emojis found.");
  },
};