export default {
  name: "say",
  description: "Make the bot repeat your message.",
  async execute(message, args) {
    const text = args.join(" ");
    if (!text) return message.reply("❌ Please provide text to say.");
    message.delete().catch(() => {});
    message.channel.send(text);
  },
};