const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const https = require("https");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slap")
    .setDescription("Send an anime slap gif to someone 👋")
    .addUserOption(opt =>
      opt.setName("user").setDescription("User to slap").setRequired(true)
    )
    .setDMPermission(true),

  async execute(interaction) {
    const target = interaction.options.getUser("user");
    if (target.id === interaction.user.id)
      return interaction.reply({ content: "💀 You can’t slap yourself.", ephemeral: true });

    const url = `https://g.tenor.com/v1/search?q=anime+slap&key=LIVDSRZULELA&limit=20`;

    https.get(url, res => {
      let data = "";
      res.on("data", chunk => (data += chunk));
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          const results = json.results;
          if (!results || results.length === 0)
            return interaction.reply({ content: "❌ No GIFs found.", ephemeral: true });

          const gif = results[Math.floor(Math.random() * results.length)].media_formats.gif.url;

          const embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`👋 **${interaction.user.username}** slapped **${target.username}**!`)
            .setImage(gif);

          interaction.reply({ embeds: [embed] });
        } catch {
          interaction.reply({ content: "⚠️ Error fetching GIF.", ephemeral: true });
        }
      });
    });
  },
};