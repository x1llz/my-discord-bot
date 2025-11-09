const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "../../data/antinuke_logs.json");
if (!fs.existsSync(logFile)) fs.writeFileSync(logFile, JSON.stringify({}));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("antinuke-log")
    .setDescription("Set or remove the Anti-Nuke log channel")
    .addSubcommand(sub =>
      sub
        .setName("set")
        .setDescription("Set a channel for Anti-Nuke alerts")
        .addChannelOption(opt =>
          opt.setName("channel").setDescription("Log channel").setRequired(true)
        )
    )
    .addSubcommand(sub =>
      sub.setName("remove").setDescription("Remove the Anti-Nuke log channel")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const guildId = interaction.guild.id;
    const sub = interaction.options.getSubcommand();
    const data = JSON.parse(fs.readFileSync(logFile));

    if (sub === "set") {
      const channel = interaction.options.getChannel("channel");
      if (channel.type !== ChannelType.GuildText)
        return interaction.reply({ content: "❌ Please select a text channel.", ephemeral: true });

      data[guildId] = channel.id;
      fs.writeFileSync(logFile, JSON.stringify(data, null, 2));
      return interaction.reply({ content: `✅ Logs channel set to ${channel}.`, ephemeral: false });
    }

    if (sub === "remove") {
      delete data[guildId];
      fs.writeFileSync(logFile, JSON.stringify(data, null, 2));
      return interaction.reply({ content: "🗑️ Anti-Nuke log channel removed.", ephemeral: false });
    }
  },
};
