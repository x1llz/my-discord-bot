const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const gifs = [
  "https://media.tenor.com/2roX3uxz_68AAAAC/anime-kiss.gif",
  "https://media.tenor.com/IjC7B8z8WmIAAAAC/kiss-anime.gif",
  "https://media.tenor.com/XfHAv-9v6KsAAAAC/anime-love.gif",
  "https://media.tenor.com/eI23JxI8BqEAAAAC/anime-kiss.gif",
  "https://media.tenor.com/v8K1QdZhcjsAAAAC/kiss.gif",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kiss")
    .setDescription("Kiss someone in anime style")
    .addUserOption(opt =>
      opt.setName("user").setDescription("Person to kiss").setRequired(true)
    ),

  async execute(interaction) {
    const target = interaction.options.getUser("user");
    const gif = gifs[Math.floor(Math.random() * gifs.length)];

    const embed = new EmbedBuilder()
      .setColor("#FF7DB6")
      .setDescription(`💋 **${interaction.user.username}** kissed **${target.username}**!`)
      .setImage(gif);

    await interaction.reply({ embeds: [embed] });
  },
};
