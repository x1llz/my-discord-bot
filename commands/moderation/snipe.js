const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("snipe")
    .setDescription("Shows the last deleted message in this channel.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction, client) {
    const data = client.snipeCache?.get(interaction.channel.id);

    if (!data)
      return interaction.reply({
        content: "⚠️ No deleted messages found in the last 5 minutes.",
        ephemeral: true,
      });

    const embed = new EmbedBuilder()
      .setColor("#00BFFF")
      .setTitle("💬 Sniped Message")
      .addFields(
        { name: "👤 Author", value: data.author, inline: true },
        { name: "🕒 Deleted", value: `<t:${Math.floor(data.time / 1000)}:R>`, inline: true }
      )
      .setDescription(`> ${data.content}`)
      .setFooter({ text: "Saved for 5 minutes only." });

    await interaction.reply({ embeds: [embed] });
  },
};