import { EmbedBuilder } from "discord.js";

export default {
  name: "copy",
  description: "Copies emojis from another server (animated or static).",
  usage: "+copy :emoji:",
  async execute(message, args) {
    try {
      if (!message.member.permissions.has("ManageEmojisAndStickers"))
        return message.reply("❌ You need the **Manage Emojis** permission.");

      const emoji = args[0];
      if (!emoji) return message.reply("⚠️ Please provide an emoji to copy!");

      const match = emoji.match(/<(a?):(\w+):(\d+)>/);
      if (!match) return message.reply("❌ Invalid emoji format.");

      const isAnimated = match[1] === "a";
      const name = match[2];
      const id = match[3];
      const ext = isAnimated ? "gif" : "png";
      const url = `https://cdn.discordapp.com/emojis/${id}.${ext}?quality=lossless`;

      const added = await message.guild.emojis.create({ attachment: url, name });
      const embed = new EmbedBuilder()
        .setColor("#00FFB3")
        .setTitle("✅ Emoji copied successfully!")
        .setDescription(`**Name:** ${added.name}\n**Animated:** ${isAnimated ? "Yes" : "No"}`)
        .setThumbnail(url)
        .setFooter({ text: `Added by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

      message.reply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      message.reply("⚠️ Failed to copy emoji. I might not have enough permissions or the emoji is invalid.");
    }
  },
};