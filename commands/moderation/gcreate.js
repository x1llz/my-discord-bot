const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gcreate")
    .setDescription("Create a giveaway announcement.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addStringOption(option =>
      option.setName("prize")
        .setDescription("The prize of the giveaway")
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName("winners")
        .setDescription("Number of winners")
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName("duration")
        .setDescription("Duration in minutes")
        .setRequired(true)
    ),

  async execute(interaction) {
    const prize = interaction.options.getString("prize");
    const winners = interaction.options.getInteger("winners");
    const duration = interaction.options.getInteger("duration");

    const endTimestamp = Date.now() + duration * 60 * 1000;
    const endTime = `<t:${Math.floor(endTimestamp / 1000)}:R>`;

    const embed = new EmbedBuilder()
      .setColor("#00BFFF")
      .setTitle("🎉 Giveaway Started!")
      .setDescription(`🎁 **Prize:** ${prize}\n👥 **Winners:** ${winners}\n⏰ **Ends:** ${endTime}`)
      .setFooter({ text: `Hosted by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

    const msg = await interaction.reply({ embeds: [embed], fetchReply: true });
    await msg.react("🎉");

    // Auto-end system
    setTimeout(async () => {
      const message = await interaction.channel.messages.fetch(msg.id);
      const users = await message.reactions.cache.get("🎉")?.users.fetch();
      const filtered = users?.filter(u => !u.bot);
      if (!filtered || filtered.size === 0) {
        return interaction.followUp({ content: "❌ No valid participants.", ephemeral: true });
      }

      const winnersList = filtered.random(winners);
      const winnerMentions = Array.isArray(winnersList)
        ? winnersList.map(u => `<@${u.id}>`).join(", ")
        : `<@${winnersList.id}>`;

      const endEmbed = new EmbedBuilder()
        .setColor("#FFD700")
        .setTitle("🏁 Giveaway Ended")
        .setDescription(`🎁 **Prize:** ${prize}\n🏆 **Winners:** ${winnerMentions}`)
        .setFooter({ text: "Giveaway finished" });

      await interaction.followUp({ embeds: [endEmbed] });
    }, duration * 60 * 1000);
  },
};
