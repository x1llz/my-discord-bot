import fetch from "node-fetch";
import { EmbedBuilder } from "discord.js";

export default {
  name: "gif",
  description: "Send a random GIF based on your search.",
  usage: "+gif <search>",
  async execute(client, message, args) {
    const query = args.join(" ");
    if (!query) {
      return message.reply("❌ Please provide a search term! Example: `+gif cat`");
    }

    try {
      const response = await fetch(
        `https://g.tenor.com/v1/search?q=${encodeURIComponent(query)}&key=LIVDSRZULELA&limit=10`
      );
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        return message.reply("😕 No GIFs found for that search.");
      }

      const randomGif = data.results[Math.floor(Math.random() * data.results.length)];
      const gifUrl = randomGif.media_formats.gif.url;

      const embed = new EmbedBuilder()
        .setColor("#00ADEF")
        .setTitle(`🎞️ GIF for "${query}"`)
        .setImage(gifUrl)
        .setFooter({ text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL() });

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply("⚠️ There was an error fetching the GIF. Please try again later.");
    }
  },
};