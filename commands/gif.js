import fetch from "node-fetch";
import { EmbedBuilder } from "discord.js";

export default {
  name: "gif",
  description: "Send a random GIF from Tenor 🎞️",
  async execute(message, args) {
    const query = args.join(" ");
    if (!query)
      return message.reply("⚠️ Please specify a keyword. Example: `+gif cat`");

    const apiKey = process.env.TENOR_KEY;
    if (!apiKey)
      return message.reply("❌ Missing TENOR_KEY in your `.env` file.");

    try {
      const response = await fetch(
        `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(
          query
        )}&key=${apiKey}&client_key=discord-bot&limit=10`
      );

      if (!response.ok) {
        console.error("Tenor API error:", response.status);
        return message.reply("⚠️ Failed to fetch GIFs. Try again later.");
      }

      const data = await response.json();
      if (!data.results || data.results.length === 0)
        return message.reply("😔 No results found for that search.");

      const gif =
        data.results[Math.floor(Math.random() * data.results.length)].media_formats.gif.url;

      const embed = new EmbedBuilder()
        .setColor("#5865F2")
        .setTitle(`🎬 GIF result for: ${query}`)
        .setImage(gif)
        .setFooter({
          text: `Requested by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        });

      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error("GIF command error:", error);
      message.reply("❌ There was an error fetching the GIF.");
    }
  },
};