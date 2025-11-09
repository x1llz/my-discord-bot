const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const gifs = [
  "https://media.tenor.com/vBv0cA6QsoAAAAAC/anime-slap.gif",
  "https://media.tenor.com/Ws6Dm1ZW_vMAAAAC/girl-slap-anime.gif",
  "https://media.tenor.com/5RzL0lA6pGIAAAAC/slap-anime.gif",
  "https://media.tenor.com/Baa_P9zGZk8AAAAC/slap.gif",
  "https://media.tenor.com/V5JvOyzZqWAAAAAC/anime-slap.gif",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slap")
    .setDescription("Slap someone brutally 😈")
    .addUserOption(opt =>
      opt.setName("user").setDescription("Person to slap").setRequired(true)
    ),

  async execute(interaction) {
    const target = interaction.options.getUser("user");
    const gif = gifs[Math.floor(Math.random() * gifs.length)];

    const embed = new EmbedBuilder()
      .setColor("#FF6961")
      .setDescription(`👋 **${interaction.user.username}** slapped **${target.username}**!`)
      .setImage(gif);

    await interaction.reply({ embeds: [embed] });
  },
};
