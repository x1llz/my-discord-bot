const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const gifs = [
  "https://media.tenor.com/aX0UItqPsaUAAAAC/hug-anime.gif",
  "https://media.tenor.com/VaF3KxJ7KH4AAAAC/anime-hug.gif",
  "https://media.tenor.com/QZC9EYP5Wk8AAAAC/hug-anime.gif",
  "https://media.tenor.com/VZtGIpd4p6kAAAAC/anime-hug-cute.gif",
  "https://media.tenor.com/E2dI7sYqQZMAAAAC/hug-anime-love.gif",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hug")
    .setDescription("Hug someone warmly")
    .addUserOption(opt =>
      opt.setName("user").setDescription("Person to hug").setRequired(true)
    ),

  async execute(interaction) {
    const target = interaction.options.getUser("user");
    const gif = gifs[Math.floor(Math.random() * gifs.length)];

    const embed = new EmbedBuilder()
      .setColor("#00BFFF")
      .setDescription(`🤗 **${interaction.user.username}** hugged **${target.username}**!`)
      .setImage(gif);

    await interaction.reply({ embeds: [embed] });
  },
};
