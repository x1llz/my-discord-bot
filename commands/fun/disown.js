const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const familyPath = path.join(__dirname, "../../data/family.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("disown")
    .setDescription("Disown one of your children 💀")
    .addUserOption((opt) =>
      opt.setName("child").setDescription("Which child do you want to disown?").setRequired(true)
    ),

  async execute(interaction) {
    const child = interaction.options.getUser("child");

    if (!fs.existsSync(familyPath))
      return interaction.reply({ content: "No family data found.", ephemeral: true });

    const data = JSON.parse(fs.readFileSync(familyPath, "utf8"));
    const parent = data[interaction.user.id];

    if (!parent || !parent.children?.includes(child.id))
      return interaction.reply({
        content: `${child.username} is not your child.`,
        ephemeral: true,
      });

    parent.children = parent.children.filter((id) => id !== child.id);
    fs.writeFileSync(familyPath, JSON.stringify(data, null, 2));

    const embed = new EmbedBuilder()
      .setColor("DarkRed")
      .setDescription(`💀 **${interaction.user.username}** has disowned **${child.username}**.`);

    await interaction.reply({ embeds: [embed] });
  },
};