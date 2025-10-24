const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("greroll")
    .setDescription("Reroll a giveaway winner using the message ID.")
    .addStringOption((opt) =>
      opt.setName("messageid").setDescription("Giveaway message ID").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false),

  async execute(interaction) {
    const messageId = interaction.options.getString("messageid");
    const channel = interaction.channel;

    try {
      const message = await channel.messages.fetch(messageId);
      const reaction = message.reactions.cache.get("🎉");
      if (!reaction)
        return interaction.reply({
          content: "⚠️ No 🎉 reaction found on that message.",
          ephemeral: true,
        });

      const users = await reaction.users.fetch();
      const entries = users.filter((u) => !u.bot).map((u) => u.id);

      if (entries.length === 0)
        return interaction.reply({
          content: "❌ No participants found for this giveaway.",
          ephemeral: true,
        });

      const winner = entries[Math.floor(Math.random() * entries.length)];
      await interaction.reply({
        content: `🎉 New winner: <@${winner}>! Congratulations!`,
      });
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: "❌ Couldn't find that giveaway or reroll it.",
        ephemeral: true,
      });
    }
  },
};