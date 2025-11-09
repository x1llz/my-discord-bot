const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gif")
    .setDescription("Send a random GIF based on your search")
    .addStringOption(opt =>
      opt.setName("query").setDescription("GIF topic").setRequired(true)
    ),

  async execute(interaction) {
    const query = interaction.options.getString("query");
    await interaction.deferReply();

    try {
      const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=${encodeURIComponent(query)}&limit=25&rating=pg`);
      const data = await res.json();

      if (!data.data.length)
        return interaction.editReply({ content: "❌ No GIFs found.", ephemeral: true });

      const gif = data.data[Math.floor(Math.random() * data.data.length)].images.original.url;

      const embed = new EmbedBuilder()
        .setColor("#00BFFF")
        .setTitle(`🎬 Random GIF for "${query}"`)
        .setImage(gif)
        .setFooter({ text: `Requested by ${interaction.user.tag}` });

      await interaction.editReply({ embeds: [embed] });
    } catch {
      await interaction.editReply({ content: "⚠️ Error while fetching GIF.", ephemeral: true });
    }
  },
};
