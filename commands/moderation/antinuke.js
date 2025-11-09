const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "../../data/antinuke.json");
if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify({}));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("antinuke")
    .setDescription("Enable or disable the anti-nuke system")
    .addStringOption(opt =>
      opt
        .setName("state")
        .setDescription("on / off")
        .setRequired(true)
        .addChoices(
          { name: "on", value: "on" },
          { name: "off", value: "off" }
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const guildId = interaction.guild.id;
    const state = interaction.options.getString("state");
    const data = JSON.parse(fs.readFileSync(file));

    data[guildId] = { enabled: state === "on" };
    fs.writeFileSync(file, JSON.stringify(data, null, 2));

    await interaction.reply({
      content: `✅ Anti-Nuke system **${state === "on" ? "enabled" : "disabled"}**.`,
      ephemeral: false,
    });
  },
};
