const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("copy")
    .setDescription("Copy an emoji or animated emoji from another server.")
    .addStringOption((opt) =>
      opt
        .setName("emoji")
        .setDescription("Paste the emoji you want to copy")
        .setRequired(true)
    )
    .setDMPermission(false),

  async execute(interaction) {
    const emojiInput = interaction.options.getString("emoji");
    const emojiRegex = /<a?:\w+:(\d+)>/;

    const match = emojiInput.match(emojiRegex);
    if (!match)
      return interaction.reply({
        content: "⚠️ Invalid emoji. Use a custom Discord emoji.",
        ephemeral: true,
      });

    const emojiId = match[1];
    const isAnimated = emojiInput.startsWith("<a:");
    const emojiURL = `https://cdn.discordapp.com/emojis/${emojiId}.${isAnimated ? "gif" : "png"}?v=1`;

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("🪞 Emoji Copied")
      .setDescription(`[Click here to view emoji](${emojiURL})`)
      .setImage(emojiURL)
      .setFooter({ text: isAnimated ? "Animated emoji" : "Static emoji" });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};