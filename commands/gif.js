const { EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "gif",
  description: "Search a random GIF 🎞️",
  async execute(message, args) {
    const query = args.join(" ");
    if (!query) return message.reply("⚠️ Provide a keyword for the GIF!");

    const API_KEY = "dc6zaTOxFJmzC"; // Public Giphy key
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(query)}&api_key=${API_KEY}&limit=1`
    );
    const { data } = await res.json();

    if (!data.length) return message.reply("No GIF found 😢");

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle(`🎞️ GIF for "${query}"`)
      .setImage(data[0].images.original.url)
      .setFooter({ text: "Made by X1LLZ | discord.gg/hellz" });

    message.channel.send({ embeds: [embed] });
  },
};