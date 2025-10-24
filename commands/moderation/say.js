const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Make the bot say something in a channel.")
    .addStringOption((opt) =>
      opt.setName("message").setDescription("Message to send").setRequired(true)
    )
    .addChannelOption((opt) =>
      opt.setName("channel").setDescription("Channel to send it to").setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false),

  async execute(interaction) {
    const message = interaction.options.getString("message");
    const channel = interaction.options.getChannel("channel") || interaction.channel;

    if (/@everyone|@here|<@&/i.test(message))
      return interaction.reply({
        content: "⚠️ Not sending pings.",
        ephemeral: true,
      });

    await channel.send(message);
    await interaction.reply({
      content: `✅ Message sent in ${channel}.`,
      ephemeral: true,
    });
  },
};