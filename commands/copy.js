const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "copy",
  description: "Copy/steal an emoji from another server. Usage: +copy <emoji|emojiID|emojiURL> [name]",
  async execute(message, args) {
    // Permission check
    if (!message.member.permissions.has("ManageEmojisAndStickers")) {
      return message.reply("❌ You need the **Manage Emojis** permission to use this command.");
    }

    if (!args[0]) return message.reply("⚠️ Please provide an emoji, emoji ID, or an image URL.");

    const input = args[0];
    const customName = args[1]; // optional name
    let emojiURL;
    let chosenName = customName || "copied_emoji";

    // 1) If input is a custom emoji like <a:name:id> or <:name:id>
    const match = input.match(/<(a)?:\w+:(\d+)>/);
    if (match) {
      const animated = Boolean(match[1]);
      const id = match[2];
      emojiURL = `https://cdn.discordapp.com/emojis/${id}.${animated ? "gif" : "png"}`;
      if (!customName) chosenName = `emoji_${id}`;
    } else if (/^https?:\/\//i.test(input)) {
      // 2) If it's a straight URL
      emojiURL = input;
      if (!customName) chosenName = `emoji_${Date.now().toString().slice(-4)}`;
    } else if (/^\d{17,19}$/.test(input)) {
      // 3) If it's probably a raw emoji ID (try gif first, then png)
      const id = input;
      // Try gif (animated) then png fallback
      // We'll test by attempting to fetch the URL later; for now try gif URL first
      emojiURL = `https://cdn.discordapp.com/emojis/${id}.gif`;
      if (!customName) chosenName = `emoji_${id}`;
    } else {
      return message.reply("⚠️ Invalid input. Provide a custom emoji (`<:name:id>`), an emoji ID, or a direct image URL.");
    }

    try {
      // If we used an ID and assumed gif, test if that URL exists; if 404, fallback to png.
      if (/^\d{17,19}$/.test(input)) {
        // try gif first
        try {
          // fetch the gif by doing a HEAD via fetch if available in env; Node doesn't have fetch guaranteed,
          // so attempt to create emoji with gif URL; if it fails, we'll catch and retry png.
          const addedGif = await message.guild.emojis.create({ attachment: emojiURL, name: chosenName });
          const embedGif = new EmbedBuilder()
            .setColor("Aqua")
            .setTitle("✅ Emoji Added (animated)")
            .setDescription(`${addedGif} \`${addedGif.name}\``)
            .setImage(addedGif.url);
          return message.reply({ embeds: [embedGif] });
        } catch (errGif) {
          // gif failed — try png
          emojiURL = `https://cdn.discordapp.com/emojis/${input}.png`;
        }
      }

      // Normal create (for url, custom emoji, or png fallback)
      const added = await message.guild.emojis.create({ attachment: emojiURL, name: chosenName });

      const embed = new EmbedBuilder()
        .setColor("Aqua")
        .setTitle("✅ Emoji Added")
        .setDescription(`Name: \`${added.name}\`\nID: \`${added.id}\`\nPreview: ${added}`)
        .setImage(added.url);

      return message.reply({ embeds: [embed] });
    } catch (err) {
      console.error("Error adding emoji:", err);

      // Helpful error messages
      if (err.message && err.message.includes("Request entity too large")) {
        return message.reply("❌ The image is too large for Discord emojis (max 256 KB). Try a smaller image or use an animated GIF under 256 KB.");
      }

      return message.reply("❌ Failed to add the emoji. Make sure the bot has `Manage Emojis` permission and the provided URL/ID is valid.");
    }
  },
};
