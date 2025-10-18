const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "copy",
  description: "Copy an emoji or GIF from another server ⚙️",
  async execute(message, args) {
    const input = args[0];
    if (!input) return message.reply("⚠️ You must provide an emoji or link!");

    try {
      let emojiURL;
      if (input.startsWith("http")) {
        emojiURL = input;
      } else {
        const match = input.match(/<?a?:?(\w+):(\d+)>?/);
        if (!match) return message.reply("⚠️ Invalid emoji format.");
        const [, name, id] = match;
        emojiURL = `https://cdn.discordapp.com/emojis/${id}.png`;
      }

      const name = args[1] || "copied_emoji";
      const newEmoji = await message.guild.emojis.create({ attachment: emojiURL, name });

      const embed = new EmbedBuilder()
        .setColor("#3498db")
        .setTitle("✅ Emoji Copied!")
        .setDescription(`> Successfully added ${newEmoji} as **:${name}:**`)
        .setFooter({ text: "Made by X1LLZ | discord.gg/hellz" });

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      message.reply("❌ Failed to copy the emoji. Make sure I have Manage Emojis permission.");
    }
  },
};