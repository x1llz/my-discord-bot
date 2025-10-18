import { EmbedBuilder } from "discord.js";
import axios from "axios";

export default {
  name: "gif",
  description: "Get a random GIF from Tenor.",
  async execute(message, args) {
    const keyword = args.join(" ");
    if (!keyword) return message.reply("⚠️ Please provide a search term.");
    const apiKey = process.env.TENOR_KEY;
    const res = await axios.get(`https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(keyword)}&key=${apiKey}&limit=10`);
    const gif = res.data.results[Math.floor(Math.random() * res.data.results.length)];
    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle(`🎞️ GIF for ${keyword}`)
      .setImage(gif.media_formats.gif.url)
      .setFooter({ text: "Powered by Tenor" });
    message.channel.send({ embeds: [embed] });
  },
};