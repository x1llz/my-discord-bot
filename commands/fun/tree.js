const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const familyPath = path.join(__dirname, "../../data/family.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tree")
    .setDescription("Show your family tree (marriage, kids, parents).")
    .addUserOption((opt) =>
      opt.setName("user").setDescription("User to view tree of").setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;
    if (!fs.existsSync(familyPath))
      return interaction.reply({ content: "No family data found.", ephemeral: true });

    const data = JSON.parse(fs.readFileSync(familyPath, "utf8"));
    const fam = data[user.id];

    if (!fam)
      return interaction.reply({
        content: `${user.username} has no family yet.`,
        ephemeral: true,
      });

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle(`🌳 Family Tree of ${user.username}`)
      .addFields(
        { name: "Partner 💍", value: fam.partner ? `<@${fam.partner}>` : "None", inline: false },
        {
          name: "Children 👶",
          value: fam.children?.length
            ? fam.children.map((c) => `<@${c}>`).join(", ")
            : "None",
          inline: false,
        }
      );

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};