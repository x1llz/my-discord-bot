// commands/utility/gif.js
const axios = require("axios");
module.exports = {
  name: "gif",
  description: "Send a GIF from Tenor / Envoie un GIF (Tenor)",
  usage: "+gif cat",
  async execute(message, args) {
    const query = args.join(" ");
    if (!query) return message.reply("⚠️ Provide a search term / Donne un mot clé.");
    const key = process.env.TENOR_KEY;
    if (!key) return message.reply("⚠️ TENOR_KEY missing in .env");

    try {
      const res = await axios.get(`https://g.tenor.com/v1/search?q=${encodeURIComponent(query)}&key=${key}&limit=20`);
      const results = res.data.results;
      if (!results || !results.length) return message.reply("😔 No GIF found / Aucun GIF trouvé.");
      const gif = results[Math.floor(Math.random()*results.length)].media[0].gif.url;
      message.channel.send(gif);
    } catch (e) {
      console.error(e);
      message.reply("⚠️ Error fetching GIF / Erreur lors de la récupération.");
    }
  },
};