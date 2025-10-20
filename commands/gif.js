import fetch from "node-fetch";
import { EmbedBuilder } from "discord.js";

export default {
  name: "gif",
  description: "Search and send a GIF 🖼️",
  async execute(message, args) {
    const query = args.join(" ");
    if (!query)
      return message.reply("⚠️ Please enter a keyword to search for a GIF.");

    try {
      const apiKey = process.env.TENOR_KEY;
      const res = await fetch(
        `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(query)}&key=${apiKey}&limit=1`
      );
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        const gif = data.results[0].media_formats.gif.url;

        const embed = new EmbedBuilder()
          .setColor("#0099ff")
          .setTitle(`🎬 GIF: ${query}`)
          .setImage(gif)
          .setFooter({ text: "Powered by Tenor | Made by X1LLZ 💻" });

        await message.channel.send({ embeds: [embed] });
        return; // 👈 AJOUTÉ : empêche le “No GIF found” d’être envoyé après
      }

      return message.reply("❌ No GIF found for that keyword.");
    } catch (err) {
      console.error(err);
      return message.reply("⚠️ Error fetching GIF.");
    }
  },
};