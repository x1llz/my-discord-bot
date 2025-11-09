const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "../../data/antinuke_whitelist.json");

if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify({}));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("antinuke-whitelist")
    .setDescription("Manage the anti-nuke whitelist")
    .addSubcommand(sub =>
      sub
        .setName("add")
        .setDescription("Add a user to the whitelist")
        .addUserOption(opt =>
          opt.setName("user").setDescription("User to whitelist").setRequired(true)
        )
    )
    .addSubcommand(sub =>
      sub
        .setName("remove")
        .setDescription("Remove a user from the whitelist")
        .addUserOption(opt =>
          opt.setName("user").setDescription("User to remove").setRequired(true)
        )
    )
    .addSubcommand(sub =>
      sub
        .setName("list")
        .setDescription("Show the whitelist for this server")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const guildId = interaction.guild.id;
    const sub = interaction.options.getSubcommand();
    const data = JSON.parse(fs.readFileSync(file));

    if (!data[guildId]) data[guildId] = [];

    if (sub === "add") {
      const user = interaction.options.getUser("user");
      if (data[guildId].includes(user.id))
        return interaction.reply({ content: "⚠️ User already whitelisted.", ephemeral: true });

      data[guildId].push(user.id);
      fs.writeFileSync(file, JSON.stringify(data, null, 2));
      return interaction.reply({ content: `✅ ${user.tag} added to whitelist.`, ephemeral: false });
    }

    if (sub === "remove") {
      const user = interaction.options.getUser("user");
      if (!data[guildId].includes(user.id))
        return interaction.reply({ content: "❌ User not in whitelist.", ephemeral: true });

      data[guildId] = data[guildId].filter(id => id !== user.id);
      fs.writeFileSync(file, JSON.stringify(data, null, 2));
      return interaction.reply({ content: `🗑️ ${user.tag} removed from whitelist.`, ephemeral: false });
    }

    if (sub === "list") {
      const list = data[guildId];
      if (list.length === 0)
        return interaction.reply({ content: "📭 No one is whitelisted.", ephemeral: true });

      const embed = new EmbedBuilder()
        .setColor("#00BFFF")
        .setTitle("🛡️ Anti-Nuke Whitelist")
        .setDescription(list.map(id => `<@${id}>`).join("\n"))
        .setFooter({ text: `Total: ${list.length}` });

      return interaction.reply({ embeds: [embed], ephemeral: false });
    }
  },
};
