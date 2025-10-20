import fetch from "node-fetch";
import { EmbedBuilder } from "discord.js";

export default {
  name: "gif",
  description: "Search for a random GIF using a keyword.",
  async execute(message, args) {
    const query = Array.isArray(args) ? args.join(" ") : args?.toString() || "";

    if (!query) {
      return message.reply("❌ Please provide a search term, e.g. `+gif cat`.");
    }

    try {
      const res = await fetch(`https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(query)}&key=LIVDSRZULELA&limit=10`);
      const data = await res.json();

      if (!data.results || data.results.length === 0) {
        return message.reply(`⚠️ No GIF found for **${query}**.`);
      }

      const gif = data.results[Math.floor(Math.random() * data.results.length)].media_formats.gif.url;

      const embed = new EmbedBuilder()
        .setColor("#00bfff")
        .setTitle(`🎬 GIF for: ${query}`)
        .setImage(gif)
        .setFooter({ text: "Powered by Tenor", iconURL: "https://tenor.com/assets/img/favicon-32x32.png" });

      await message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error("Error fetching GIF:", err);
      return message.reply("❌ Something went wrong while fetching the GIF.");
    }
  },
};