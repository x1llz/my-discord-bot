module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    // ===== Optional: Cooldowns =====
    const cooldowns = client.cooldowns;
    const now = Date.now();
    const cooldownAmount = (command.cooldown || 3) * 1000;
    const key = `${interaction.user.id}-${command.data.name}`;

    if (!cooldowns.has(key)) cooldowns.set(key, now);
    else {
      const expiration = cooldowns.get(key) + cooldownAmount;
      if (now < expiration) {
        const remaining = ((expiration - now) / 1000).toFixed(1);
        return interaction.reply({
          content: `⏳ Slow down — try again in **${remaining}s**.`,
          ephemeral: true,
        });
      }
      cooldowns.set(key, now);
    }
    setTimeout(() => cooldowns.delete(key), cooldownAmount);

    // ===== Command Execution =====
    try {
      await command.execute(interaction, client);
      console.log(
        `⚡ ${interaction.user.tag} used /${interaction.commandName} in ${
          interaction.guild ? interaction.guild.name : "DM"
        }`
      );
    } catch (err) {
      console.error(`❌ Error in /${interaction.commandName}:`, err);
      const reply = { content: "⚠️ Something went wrong executing this command.", ephemeral: true };
      if (interaction.replied || interaction.deferred) await interaction.followUp(reply);
      else await interaction.reply(reply);
    }
  },
};
