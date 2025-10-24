const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} = require("discord.js");
const fs = require("fs");
const path = require("path");

const familyPath = path.join(__dirname, "../../data/family.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("adopt")
    .setDescription("Adopt someone as your child 👶")
    .addUserOption((opt) =>
      opt.setName("user").setDescription("Who do you want to adopt?").setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    if (user.id === interaction.user.id)
      return interaction.reply({ content: "You can’t adopt yourself 💀", ephemeral: true });

    if (!fs.existsSync(familyPath)) fs.writeFileSync(familyPath, JSON.stringify({}, null, 2));
    const data = JSON.parse(fs.readFileSync(familyPath, "utf8"));

    const embed = new EmbedBuilder()
      .setColor("Yellow")
      .setDescription(`👶 **${interaction.user.username}** wants to adopt **${user.username}**!`);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("accept_adopt")
        .setLabel("Accept 🤝")
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId("decline_adopt")
        .setLabel("Decline ❌")
        .setStyle(ButtonStyle.Danger)
    );

    const msg = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });

    const collector = msg.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 30000,
    });

    collector.on("collect", async (i) => {
      if (i.user.id !== user.id)
        return i.reply({ content: "This adoption isn’t for you.", ephemeral: true });

      if (i.customId === "accept_adopt") {
        if (!data[interaction.user.id]) data[interaction.user.id] = { children: [] };
        if (!data[interaction.user.id].children) data[interaction.user.id].children = [];
        data[interaction.user.id].children.push(user.id);

        fs.writeFileSync(familyPath, JSON.stringify(data, null, 2));

        await i.update({
          embeds: [
            new EmbedBuilder()
              .setColor("Green")
              .setDescription(`🎉 **${user.username}** has been adopted by **${interaction.user.username}**!`)
          ],
          components: [],
        });
      } else {
        await i.update({
          embeds: [
            new EmbedBuilder()
              .setColor("Red")
              .setDescription(`❌ **${user.username}** refused to be adopted.`)
          ],
          components: [],
        });
      }
    });

    collector.on("end", async (collected) => {
      if (collected.size === 0)
        await msg.edit({ content: "⏰ Adoption request timed out.", components: [] });
    });
  },
};