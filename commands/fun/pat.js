const { SlashCommandBuilder } = require("discord.js");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pat")
    .setDescription("Send a cute pat GIF to someone")
    .addUserOption(opt =>
      opt.setName("user").setDescription("The person you want to pat").setRequired(true)
    )
    .setDMPermission(true),

  async execute(interaction) {
    await interaction.deferReply();
    const user = interaction.options.getUser("user");
    const key = process.env.TENOR_KEY;
    try {
      const res = await fetch(`https://tenor.googleapis.com/v2/search?q=anime+pat&key=${key}&limit=25`);
      const data = await res.json();
      const gif = data.results[Math.floor(Math.random() * data.results.length)];
      await interaction.editReply(`${interaction.user} pats ${user} 🐾\n${gif.media_formats.gif.url}`);
    } catch {
      await interaction.editReply("Error loading GIF.");
    }
  },
};