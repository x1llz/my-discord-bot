const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("banner")
    .setDescription("Show the banner of a user")
    .addUserOption(opt =>
      opt.setName("user").setDescription("User to view").setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;
    const fetchedUser = await interaction.client.users.fetch(user.id, { force: true });

    if (!fetchedUser.banner)
      return interaction.reply({ content: "❌ This user has no banner.", ephemeral: true });

    const banner = fetchedUser.bannerURL({ size: 4096, dynamic: true });

    const embed = new EmbedBuilder()
      .setColor("#00BFFF")
      .setTitle(`${user.tag}'s Banner`)
      .setImage(banner)
      .setFooter({ text: `Requested by ${interaction.user.tag}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
