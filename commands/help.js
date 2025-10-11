const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "help",
  description: "Show all available commands 💡",

  async execute(message, args, client) {
    try {
      // Récupération de toutes les commandes enregistrées
      const commands = Array.from(client.commands.values())
        .filter(cmd => cmd.name && cmd.description)
        .sort((a, b) => a.name.localeCompare(b.name));

      // Liste formatée
      const commandList = commands
        .map(cmd => `> **+${cmd.name}** — ${cmd.description}`)
        .join("\n");

      // Embed stylé
      const embed = new EmbedBuilder()
        .setColor("#ff0066")
        .setTitle("💫 Hellz Command Center 💫")
        .setDescription(
          `Hey **${message.author.username}**, here’s everything I can do for you right now:\n\n${commandList}`
        )
        .addFields(
          { name: "✨ Prefix", value: "`+`", inline: true },
          { name: "🧠 Total Commands", value: `${commands.length}`, inline: true }
        )
        .setFooter({
          text: "Made by X1LLZ 💻 | Hellz Bot",
          iconURL: message.client.user.displayAvatarURL(),
        })
        .setTimestamp();

      await message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error("❌ Help command error:", err);
      message.reply("⚠️ Something went wrong while displaying the help menu.");
    }
  },
};
