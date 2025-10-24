const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const https = require("https");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gif")
    .setDescription("Send a random GIF based on your keyword 🎞️")
    .addStringOption((opt) =>
      opt
        .setName("search")
        .setDescription("What type of gif do you want? (ex: monkey, cat, anime, love...)")
        .setRequired(true)
    ),

  async execute(interaction) {
    const query = interaction.options.getString("search");
    const url = `https://g.tenor.com/v1/search?q=${encodeURIComponent(query)}&key=LIVDSRZULELA&limit=10`;

    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            if (!json.results || json.results.length === 0)
              return interaction.reply({ content: "❌ No GIFs found.", ephemeral: true });

            const random = json.results[Math.floor(Math.random() * json.results.length)];
            const gifUrl = random.media_formats.gif.url;

            const embed = new EmbedBuilder()
              .setColor("Aqua")
              .setTitle(`🎞️ Random "${query}" GIF`)
              .setImage(gifUrl)
              .setFooter({ text: `Requested by ${interaction.user.username}` });

            interaction.reply({ embeds: [embed] });
          } catch {
            interaction.reply({ content: "⚠️ Error loading GIF.", ephemeral: true });
          }
        });
      })
      .on("error", () => {
        interaction.reply({ content: "⚠️ GIF request failed.", ephemeral: true });
      });
  },
};