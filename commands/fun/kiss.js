const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const https = require("https");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kiss")
    .setDescription("Send an anime kiss gif to another user 💋")
    .addUserOption((opt) =>
      opt.setName("user").setDescription("User to kiss").setRequired(true)
    )
    .setDMPermission(true), // ✅ usable in DMs

  async execute(interaction) {
    const target = interaction.options.getUser("user");
    if (target.id === interaction.user.id)
      return interaction.reply({ content: "💀 You can’t kiss yourself.", ephemeral: true });

    const url = `https://g.tenor.com/v1/search?q=anime+kiss&key=LIVDSRZULELA&limit=20`;

    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            if (!json.results || json.results.length === 0)
              return interaction.reply({ content: "❌ No GIFs found.", ephemeral: true });

            const random = json.results[Math.floor(Math.random() * json.results.length)];
            const gifUrl = random.media_formats.gif.url;

            const embed = new EmbedBuilder()
              .setColor("Pink")
              .setDescription(`💋 **${interaction.user.username}** kissed **${target.username}**!`)
              .setImage(gifUrl);

            interaction.reply({ embeds: [embed] });
          } catch {
            interaction.reply({ content: "⚠️ Error loading GIF.", ephemeral: true });
          }
        });
      })
      .on("error", () => {
        interaction.reply({ content: "⚠️ Couldn’t reach Tenor API.", ephemeral: true });
      });
  },
};