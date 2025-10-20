import fetch from "node-fetch";
import { EmbedBuilder } from "discord.js";

export default {
  name: "gif",
  description: "Search and send a random GIF from Tenor 🎞️",
  async execute(message, args) {
    const query = args.join(" ");
    if (!query) return message.reply("❌ Please provide a search term (e.g. `+gif cat`).");

    try {
      const response = await fetch(
        `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(query)}&key=AIzaSyCj-ygYkPzWdd6OGfBfQmFqfFdfCw4yU9o&client_key=discord&limit=10`
      );
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        return message.reply("⚠️ No GIF found for that search.");
      }

      const random = data.results[Math.floor(Math.random() * data.results.length)];
      const gifUrl = random.media_formats?.gif?.url || random.url;

      const embed = new EmbedBuilder()
        .setColor("#00acee")
        .setTitle(`🎞️ ${query}`)
        .setImage(gifUrl)
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

      await message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error("❌ Error fetching GIF:", err);
      message.reply("⚠️ Error fetching GIF. Please try again later.");
    }
  },
};