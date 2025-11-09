// commands/fun/snipe.js
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("snipe")
    .setDescription("Show the last deleted message in this channel"),

  async execute(interaction) {
    const data = interaction.client.snipeCache?.get(interaction.channel.id);
    if (!data)
      return interaction.reply({ content: "❌ No deleted message in the last 5 minutes.", ephemeral: true });

    const embed = new EmbedBuilder()
      .setColor("#00BFFF")
      .setTitle("🕵️ Last Deleted Message")
      .addFields(
        { name: "👤 Author", value: data.author, inline: false },
        { name: "💬 Message", value: data.content, inline: false }
      )
      .setFooter({ text: "Stored for 5 minutes" })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
