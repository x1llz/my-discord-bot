
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { fetchGif } = require("../../utils/gifUtil");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slap")
    .setDescription("Slap a user with a gif 👋")
    .addUserOption(opt => opt.setName("user").setDescription("User").setRequired(true))
    .setDMPermission(true),

  async execute(interaction) {
    const target = interaction.options.getUser("user");
    if (target.id === interaction.user.id)
      return interaction.reply({ content: "Action impossible sur toi-même.", ephemeral: true });

    const gif = await fetchGif("anime slap gif", [
      "https://media.tenor.com/I-4_kiss_gifAA/tenor.gif",
      "https://media.tenor.com/II_fallback_gifBB/tenor.gif"
    ]);

    const embed = new EmbedBuilder()
      .setColor("Random")
      .setDescription(`**${interaction.user.username}** → **${target.username}**`)
      .setImage(gif);

    await interaction.reply({ embeds: [embed] });
  },
};
