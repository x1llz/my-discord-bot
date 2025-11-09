// commands/utilities/mods.js
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const adminsFile = path.join(__dirname, "../../data/admins.json");

if (!fs.existsSync(adminsFile)) fs.writeFileSync(adminsFile, JSON.stringify([]));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mods")
    .setDescription("Show the bot owner and bot admins"),

  async execute(interaction) {
    const ownerId = "1187100546683899995";
    const admins = JSON.parse(fs.readFileSync(adminsFile));

    const ownerUser = await interaction.client.users.fetch(ownerId).catch(() => null);
    const ownerTag = ownerUser ? ownerUser.tag : "Unknown";

    const adminList =
      admins.length > 0
        ? await Promise.all(
            admins.map(async id => {
              const user = await interaction.client.users.fetch(id).catch(() => null);
              return user ? user.tag : `Unknown (${id})`;
            })
          )
        : [];

    const embed = new EmbedBuilder()
      .setColor("#00BFFF")
      .setTitle("🤖 Bot Staff")
      .addFields(
        { name: "👑 Bot Owner", value: ownerTag, inline: false },
        { name: "🛡️ Bot Admins", value: adminList.length ? adminList.join("\n") : "None", inline: false }
      )
      .setFooter({ text: "Hellz Bot", iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
