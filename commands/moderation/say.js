// commands/fun/say.js
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Make the bot say something (supports mentions)")
    .addStringOption(opt =>
      opt.setName("message").setDescription("Message to send").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const message = interaction.options.getString("message");

    await interaction.channel.send({
      content: message,
      allowedMentions: { parse: ["users", "roles", "everyone"] },
    });

    await interaction.reply({ content: "✅ Message sent.", ephemeral: true });
  },
};
