const { SlashCommandBuilder, EmbedBuilder, ComponentType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("marry")
    .setDescription("Propose to someone 💍")
    .addUserOption((opt) =>
      opt.setName("user").setDescription("Who do you want to marry?").setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    if (user.id === interaction.user.id)
      return interaction.reply({ content: "💀 You can’t marry yourself.", ephemeral: true });

    const embed = new EmbedBuilder()
      .setColor("Pink")
      .setDescription(`💍 **${interaction.user.username}** wants to marry **${user.username}**!`);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("accept_marry")
        .setLabel("Accept 💕")
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId("decline_marry")
        .setLabel("Decline 💔")
        .setStyle(ButtonStyle.Danger)
    );

    const msg = await interaction.reply({
      embeds: [embed],
      components: [row],
      fetchReply: true,
    });

    const collector = msg.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 30000,
    });

    collector.on("collect", async (i) => {
      if (i.user.id !== user.id)
        return i.reply({ content: "This proposal isn’t for you.", ephemeral: true });

      if (i.customId === "accept_marry") {
        await i.update({
          embeds: [
            new EmbedBuilder()
              .setColor("Green")
              .setDescription(`💞 **${interaction.user.username}** and **${user.username}** are now married! 💍`)
          ],
          components: [],
        });
      } else if (i.customId === "decline_marry") {
        await i.update({
          embeds: [
            new EmbedBuilder()
              .setColor("Red")
              .setDescription(`💔 **${user.username}** refused to marry **${interaction.user.username}**.`)
          ],
          components: [],
        });
      }
    });

    collector.on("end", async (collected) => {
      if (collected.size === 0)
        await msg.edit({
          content: "⏰ Proposal timed out.",
          components: [],
        });
    });
  },
};