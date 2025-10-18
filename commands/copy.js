export default {
  name: "copy",
  description: "Copy an emoji or sticker from another server.",
  async execute(message, args) {
    const emoji = args[0];
    if (!emoji) return message.reply("❌ Please provide an emoji or emoji ID.");

    try {
      const match = emoji.match(/<a?:\w+:(\d+)>/);
      const emojiId = match ? match[1] : emoji;
      const url = `https://cdn.discordapp.com/emojis/${emojiId}.png?v=1`;

      const name = args[1] || `emoji_${emojiId}`;
      const added = await message.guild.emojis.create({ attachment: url, name });

      message.reply(`✅ Emoji added: ${added.toString()}`);
    } catch (err) {
      console.error(err);
      message.reply("❌ Failed to copy emoji. Make sure I have permission.");
    }
  },
};