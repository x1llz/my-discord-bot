// commands/moderation/greroll.js
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("greroll")
    .setDescription("Reroll a finished giveaway using its message ID")
    .addStringOption(opt =>
      opt.setName("message_id").setDescription("Message ID of the giveaway").setRequired(true)
    )
    .addIntegerOption(opt =>
      opt.setName("winners").setDescription("Number of new winners").setRequired(true)
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

      await channel.send(`🎊 Reroll winners: ${winnersText}`);
      await interaction.reply({ content: "✅ Giveaway rerolled successfully.", ephemeral: true });
    } catch (err) {
      console.error(err);
      return interaction.reply({ content: "❌ Invalid message ID or message not found in this channel.", ephemeral: true });
    }
  },
};
