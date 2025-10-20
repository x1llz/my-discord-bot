import { EmbedBuilder } from "discord.js";
import fetch from "node-fetch";

export default {
  name: "gif",
  description: "Search and send a GIF from Tenor 🎞️",
  usage: "+gif <search>",

  async execute(client, message, args) {
    const query = args.join(" ");
    if (!query)
      return message.reply("❌ Please provide a search term. Example: `+gif monkey`");

    try {
      const res = await fetch(
        `https://g.tenor.com/v1/search?q=${encodeURIComponent(query)}&limit=20&key=LIVDSRZULELA`
      );
      const data = await res.json();

      if (!data.results || data.results.length === 0)
        return message.reply("😕 No GIFs found for that search.");

      const gif =
        data.results[Math.floor(Math.random() * data.results.length)].media[0].gif.url;

      const embed = new EmbedBuilder()
        .setColor("#00ADEF")
        .setTitle(`🎞️ Result for "${query}"`)
        .setImage(gif)
        .setFooter({
          text: `Requested by ${message.author.username}`,
          iconURL: message.author.displayAvatarURL(),
        });

      await message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error("GIF error:", err);
      message.reply("⚠️ Something went wrong fetching the GIF.");
    }
  },
};