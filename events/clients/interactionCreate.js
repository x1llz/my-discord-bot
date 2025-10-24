module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction, client);
      console.log(
        `⚡ ${interaction.user.tag} used /${interaction.commandName} in ${
          interaction.guild ? interaction.guild.name : "DM"
        }`
      );
    } catch (err) {
      console.error(err);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "⚠️ Error executing this command.",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "⚠️ Error executing this command.",
          ephemeral: true,
        });
      }
    }
  },
};