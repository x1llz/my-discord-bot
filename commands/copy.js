import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

export default {
  name: "copy",
  description: "Copy an emoji or animated emoji from another server 😎",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageEmojisAndStickers))
      return message.reply("❌ You don’t have permission to manage emojis.");

    const emojiArg = args[0];
    if (!emojiArg)
      return message.reply("⚠️ Please provide an emoji or emoji ID.");

    const match = emojiArg.match(/<(a?):(\w+):(\d+)>/);
    let emojiURL, emojiName;

    if (match) {
      const isAnimated = match[1] === "a";
      const emojiId = match[3];
      emojiName = match[2];
      emojiURL = `https://cdn.discordapp.com/emojis/${emojiId}.${isAnimated ? "gif" : "png"}?quality=lossless`;
    } else if (/^\d+$/.test(emojiArg)) {
      // Emoji ID directly
      emojiURL = `https://cdn.discordapp.com/emojis/${emojiArg}.png?quality=lossless`;
      emojiName = `emoji_${emojiArg}`;
    } else {
      return message.reply("❌ Invalid emoji format or ID.");
    }

    try {
      const emoji = await message.guild.emojis.create({ attachment: emojiURL, name: emojiName });
      const embed = new EmbedBuilder()
        .setColor("#7289da")
        .setTitle("✨ Emoji Copied!")
        .setDescription(`Emoji successfully added to this server!\n> ${emoji} \`:${emoji.name}:\``)
        .setThumbnail(emojiURL)
        .setFooter({ text: "Hellz V2 | discord.gg/hellz" });

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      message.reply("❌ Failed to add the emoji. Make sure I have `Manage Emojis` permission!");
    }
  },
};