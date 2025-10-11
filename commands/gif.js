const { EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "gif",
  description: "Send a random GIF based on a keyword.",
  async execute(message, args) {
    if (!args.length) return message.reply("❌ Please provide a search term, e.g. `+gif dance`.");

    const query = args.join(" ");
    const apiKey = process.env.TENOR_API_KEY || process.env.TENOR_KEY;

    if (!apiKey) return message.reply("⚠️ Missing TENOR API key in `.env` file.");

    try {
      const res = await axios.get(`https://g.tenor.com/v1/search?q=${encodeURIComponent(query)}&key=${apiKey}&limit=10`);
      const gifs = res.data.results;

      if (!gifs.length) return message.reply("😢 No GIFs found for that term.");
      const randomGif = gifs[Math.floor(Math.random() * gifs.length)].url;

      const embed = new EmbedBuilder()
        .setColor("Purple")
        .setTitle(`🎬 GIF: ${query}`)
        .setURL(randomGif)
        .setDescription("Here's a random GIF for you!")
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      message.reply("⚠️ Error fetching GIFs, please try again later.");
    }
  },
};
