const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const https = require("https");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hug")
    .setDescription("Send an anime hug gif to someone 🤗")
    .addUserOption(opt =>
      opt.setName("user").setDescription("User to hug").setRequired(true)
    )
    .setDMPermission(true),

  async execute(interaction) {
    const target = interaction.options.getUser("user");
    if (target.id === interaction.user.id)
      return interaction.reply({ content: "💀 You can’t hug yourself.", ephemeral: true });

    const url = `https://g.tenor.com/v1/search?q=anime+hug&key=LIVDSRZULELA&limit=20`;

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
            .setColor("Orange")
            .setDescription(`🤗 **${interaction.user.username}** hugged **${target.username}**!`)
            .setImage(gif);

          interaction.reply({ embeds: [embed] });
        } catch {
          interaction.reply({ content: "⚠️ Error fetching GIF.", ephemeral: true });
        }
      });
    });
  },
};