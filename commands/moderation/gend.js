// commands/moderation/gend.js
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gend")
    .setDescription("End an active giveaway using its message ID")
    .addStringOption(opt =>
      opt.setName("message_id").setDescription("Message ID of the giveaway").setRequired(true)
    )
    .addIntegerOption(opt =>
      opt.setName("winners").setDescription("Number of winners to pick").setRequired(true)
    ),

  async execute(interaction) {
    const messageId = interaction.options.getString("message_id");
    const winners = interaction.options.getInteger("winners");
    const channel = interaction.channel;

    try {
      const msg = await channel.messages.fetch(messageId);
      const reaction = msg.reactions.cache.get("🎉");
      if (!reaction)
        return interaction.reply({ content: "❌ No 🎉 reaction found on that message.", ephemeral: true });

      const users = await reaction.users.fetch();
      const participants = users.filter(u => !u.bot);
      if (participants.size === 0)
        return interaction.reply({ content: "❌ No participants found.", ephemeral: true });

      const winnersList = participants.random(winners);
      const winnersText = winnersList.map(u => `${u}`).join(", ");

      const embed = EmbedBuilder.from(msg.embeds[0])
        .setTitle("🎉 Giveaway Ended!")
        .setDescription(`**Prize:** ${embed.data?.description?.match(/\*\*Prize:\*\* (.+)/)?.[1] || "Unknown"}\n\n**Winners:** ${winnersText}`)
        .setColor("#ff5050");

      await msg.edit({ embeds: [embed] });
      await channel.send(`🎊 Congratulations ${winnersText}! You won the giveaway!`);

      await interaction.reply({ content: "✅ Giveaway ended successfully.", ephemeral: true });
    } catch (err) {
      console.error(err);
      return interaction.reply({ content: "❌ Invalid message ID or message not found in this channel.", ephemeral: true });
    }
  },
};
