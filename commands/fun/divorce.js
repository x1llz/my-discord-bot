const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const familyPath = path.join(__dirname, "../../data/family.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("divorce")
    .setDescription("Divorce your partner 💔"),

  async execute(interaction) {
    if (!fs.existsSync(familyPath))
      return interaction.reply({ content: "No family data found.", ephemeral: true });

    const data = JSON.parse(fs.readFileSync(familyPath, "utf8"));
    const userFam = data[interaction.user.id];

    if (!userFam || !userFam.partner)
      return interaction.reply({ content: "You’re not married.", ephemeral: true });

    const partnerId = userFam.partner;
    delete data[interaction.user.id].partner;
    if (data[partnerId]?.partner === interaction.user.id) delete data[partnerId].partner;

    fs.writeFileSync(familyPath, JSON.stringify(data, null, 2));
    await interaction.reply({
      content: `💔 You are now divorced from <@${partnerId}>.`,
    });
  },
};