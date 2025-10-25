const { SlashCommandBuilder } = require("discord.js");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gif")
    .setDescription("Send a random GIF based on a keyword")
    .addStringOption(opt =>
      opt
        .setName("query")
        .setDescription("Keyword to search (e.g. cat, dance, anime)")
        .setRequired(true)
    )
    .setDMPermission(true),

  async execute(interaction) {
    await interaction.deferReply();
    const query = interaction.options.getString("query");
    const key = process.env.TENOR_KEY;
    try {
      const res = await fetch(
        `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(query)}&key=${key}&limit=25`
      );
      const data = await res.json();
      if (!data.results || data.results.length === 0)
        return await interaction.editReply("No GIFs found for that keyword.");
      const gif = data.results[Math.floor(Math.random() * data.results.length)];
      await interaction.editReply(gif.media_formats.gif.url);
    } catch {
      await interaction.editReply("Error while loading the GIF.");
    }
  },
};