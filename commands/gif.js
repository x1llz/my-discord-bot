import fetch from "node-fetch";
import { EmbedBuilder } from "discord.js";

export default {
  name: "gif",
  description: "Search and send a random GIF from Tenor.",
  async execute(message, args) {
    const query = args.join(" ");
    if (!query) return message.reply("❌ Please provide a search term, e.g. `+gif cat`.");

    const apiKey = process.env.TENOR_KEY; // ✅ ta clé Render ici
    if (!apiKey) return message.reply("⚠️ Missing Tenor API key in environment variables.");

    try {
      const res = await fetch(`https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(query)}&key=${apiKey}&limit=10`);
      const data = await res.json();

      if (!data.results?.length) {
        return message.reply(`⚠️ No GIF found for **${query}**.`);
      }

      const gif = data.results[Math.floor(Math.random() * data.results.length)].media_formats.gif.url;

      const embed = new EmbedBuilder()
        .setColor("#00bfff")
        .setTitle(`🎬 GIF for: ${query}`)
        .setImage(gif)
        .setFooter({ text: "Powered by Tenor", iconURL: "https://tenor.com/assets/img/favicon-32x32.png" });

      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply("❌ Something went wrong fetching the GIF.");
    }
  },
};