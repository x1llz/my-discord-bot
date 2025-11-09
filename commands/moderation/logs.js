// commands/moderation/logs.js
const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const logsFile = path.join(__dirname, "../../data/logs.json");

if (!fs.existsSync(logsFile)) fs.writeFileSync(logsFile, JSON.stringify({}));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("logs")
    .setDescription("Set or remove the log channel")
    .addSubcommand(sub =>
      sub
        .setName("set")
        .setDescription("Set the log channel")
        .addChannelOption(opt =>
          opt.setName("channel").setDescription("Log channel").setRequired(true)
        )
    )
    .addSubcommand(sub =>
      sub.setName("remove").setDescription("Remove the log channel")
    ),

  async execute(interaction) {
    const guildId = interaction.guild.id;
    let logs = JSON.parse(fs.readFileSync(logsFile));

    if (interaction.options.getSubcommand() === "set") {
      const channel = interaction.options.getChannel("channel");
      logs[guildId] = channel.id;
      fs.writeFileSync(logsFile, JSON.stringify(logs, null, 2));
      return interaction.reply({ content: `✅ Logs channel set to ${channel}.`, ephemeral: false });
    }

    if (interaction.options.getSubcommand() === "remove") {
      delete logs[guildId];
      fs.writeFileSync(logsFile, JSON.stringify(logs, null, 2));
      return interaction.reply({ content: "🗑️ Log channel removed.", ephemeral: false });
    }
  },
};
