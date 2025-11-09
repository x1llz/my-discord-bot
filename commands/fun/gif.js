const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

// ✅ Compatible avec CommonJS
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gif")
    .setDescription("Search for a random GIF using a keyword.")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Keyword to search for a GIF (e.g. anime, cat, meme)")
        .setRequired(true)
    ),

  async execute(interaction) {
    const query = interaction.options.getString("query");
    const apiKey = process.env.TENOR_KEY;

    if (!apiKey)
      return interaction.reply({
        content: "⚠️ The TENOR API key is missing in `.env`.",
        ephemeral: true,
      });

    try {
      const res = await fetch(
        `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(query)}&key=${apiKey}&limit=10`
      );
      const data = await res.json();

      if (!data.results || data.results.length === 0)
        return interaction.reply({ content: "❌ No GIFs found for that query.", ephemeral: true });

      const random = data.results[Math.floor(Math.random() * data.results.length)];
      const gifUrl = random.media_formats?.gif?.url || random.url;

      const embed = new EmbedBuilder()
        .setTitle(`🎞️ GIF: ${query}`)
        .setImage(gifUrl)
        .setColor("#00BFFF")
        .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.error("❌ GIF fetch error:", err);
      await interaction.reply({ content: "⚠️ Failed to fetch GIFs.", ephemeral: true });
    }
  },
};
