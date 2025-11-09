const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const gifs = [
  "https://media.tenor.com/SMAF2J2vBqMAAAAC/anime-pat.gif",
  "https://media.tenor.com/NTE0O7Hz9J4AAAAC/anime-headpat.gif",
  "https://media.tenor.com/UXplv5B-Fk4AAAAC/pat-anime.gif",
  "https://media.tenor.com/EhFjPwF6_sYAAAAC/anime-pat.gif",
  "https://media.tenor.com/Lp-WmD0GzFMAAAAC/pat-anime.gif",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pat")
    .setDescription("Pat someone gently")
    .addUserOption(opt =>
      opt.setName("user").setDescription("Person to pat").setRequired(true)
    ),

  async execute(interaction) {
    const target = interaction.options.getUser("user");
    const gif = gifs[Math.floor(Math.random() * gifs.length)];

    const embed = new EmbedBuilder()
      .setColor("#FFD580")
      .setDescription(`🐾 **${interaction.user.username}** patted **${target.username}**!`)
      .setImage(gif);

    await interaction.reply({ embeds: [embed] });
  },
};
