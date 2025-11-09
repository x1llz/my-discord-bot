const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");
const path = require("path");
const vanityFile = path.join(__dirname, "../../data/vanity.json");

if (!fs.existsSync(vanityFile)) fs.writeFileSync(vanityFile, JSON.stringify({}));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vanityremove")
    .setDescription("Remove the vanity system from this server")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const vanityData = JSON.parse(fs.readFileSync(vanityFile));

    if (!vanityData[interaction.guild.id])
      return interaction.reply({ content: "❌ No vanity system is set on this server.", ephemeral: true });

    delete vanityData[interaction.guild.id];
    fs.writeFileSync(vanityFile, JSON.stringify(vanityData, null, 2));

    await interaction.reply({ content: "✅ Vanity system has been removed from this server.", ephemeral: false });
  },
};
