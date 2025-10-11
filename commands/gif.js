const { EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "gif",
  description: "Get a GIF from Pinterest based on a keyword (ex: +gif love).",
  async execute(message, args) {
    const keyword = args.join(" ");
    if (!keyword) return message.reply("⚠️ Please provide a keyword for the GIF.");

    try {
      // Pinterest search via API is not public — on peut utiliser un “scraping” ou une API tierce
      // Utilisons ici l’API de Tenor (exemple) pour les GIFs : gratuit, simple
      const apiKey = process.env.TENOR_KEY;
      if (!apiKey) return message.reply("❌ GIF service not configured (TENOR_KEY missing).");

      const url = `https://api.tenor.com/v1/search?q=${encodeURIComponent(keyword)}&key=${apiKey}&limit=10&media_filter=minimal`;
      const res = await axios.get(url);
      const results = res.data.results;
      if (!results || results.length === 0) return message.reply("😔 No GIF found.");

      const gifUrl = results[Math.floor(Math.random() * results.length)].media[0].gif.url;

      const embed = new EmbedBuilder()
        .setColor("Purple")
        .setTitle(`GIF: ${keyword}`)
        .setImage(gifUrl)
        .setFooter({ text: `Requested by ${message.author.tag}` });

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      message.reply("❌ Failed to fetch GIF.");
    }
  },
};
