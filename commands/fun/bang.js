const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const gifs = [
  "https://media.tenor.com/V-4O-x8bJ6kAAAAC/anime-shoot.gif",
  "https://media.tenor.com/QTv0CB2s5bcAAAAC/anime-bang.gif",
  "https://media.tenor.com/dxYFip8cD0AAAAAC/anime-shoot-headshot.gif",
  "https://media.tenor.com/6Kz7PrqY4hAAAAAC/anime-gun.gif",
  "https://media.tenor.com/wgDbdIbsswUAAAAC/anime-shoot.gif",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bang")
    .setDescription("Bang someone 💀 (for fun)")
    .addUserOption(opt =>
      opt.setName("user").setDescription("Target to bang").setRequired(true)
    ),

  async execute(interaction) {
    const target = interaction.options.getUser("user");
    const gif = gifs[Math.floor(Math.random() * gifs.length)];

    const embed = new EmbedBuilder()
      .setColor("#000000")
      .setDescription(`🔫 **${interaction.user.username}** just banged **${target.username}**! 💥`)
      .setImage(gif);

    await interaction.reply({ embeds: [embed] });
  },
};
