module.exports = {
  name: "say",
  description: "Make the bot say something 💬",
  async execute(message, args) {
    if (!args.length) return message.reply("⚠️ You need to provide a message!");
    const text = args.join(" ");
    await message.delete().catch(() => {});
    message.channel.send(text);
  },
};