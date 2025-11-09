const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../data/blacklist.json");

if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("blacklist")
    .setDescription("Blacklist or unblacklist a user from using the bot.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand(sub =>
      sub
        .setName("add")
        .setDescription("Blacklist a user.")
        .addUserOption(opt =>
          opt.setName("user").setDescription("User to blacklist").setRequired(true)
        )
    )
    .addSubcommand(sub =>
      sub
        .setName("remove")
        .setDescription("Remove a user from blacklist.")
        .addUserOption(opt =>
          opt.setName("user").setDescription("User to unblacklist").setRequired(true)
        )
    )
    .addSubcommand(sub =>
      sub.setName("list").setDescription("Show all blacklisted users."))
  ,

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const admins = ["1187100546683899995"]; // Bot owner ID
    const userId = interaction.user.id;

    if (!admins.includes(userId))
      return interaction.reply({
        content: "⚠️ Only the bot owner can manage the blacklist.",
        ephemeral: true,
      });

    let blacklist = JSON.parse(fs.readFileSync(filePath));

    if (sub === "add") {
      const target = interaction.options.getUser("user");
      if (blacklist.includes(target.id))
        return interaction.reply({ content: "❌ That user is already blacklisted.", ephemeral: true });

      blacklist.push(target.id);
      fs.writeFileSync(filePath, JSON.stringify(blacklist, null, 2));

      const embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`🚫 **${target.tag}** has been blacklisted from using the bot.`);
      return interaction.reply({ embeds: [embed] });
    }

    if (sub === "remove") {
      const target = interaction.options.getUser("user");
      if (!blacklist.includes(target.id))
        return interaction.reply({ content: "❌ That user is not blacklisted.", ephemeral: true });

      blacklist = blacklist.filter(id => id !== target.id);
      fs.writeFileSync(filePath, JSON.stringify(blacklist, null, 2));

      const embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`✅ **${target.tag}** has been removed from the blacklist.`);
      return interaction.reply({ embeds: [embed] });
    }

    if (sub === "list") {
      if (blacklist.length === 0)
        return interaction.reply({ content: "✅ No users are blacklisted.", ephemeral: true });

      const users = blacklist.map(id => `<@${id}>`).join("\n");
      const embed = new EmbedBuilder()
        .setColor("DarkButNotBlack")
        .setTitle("🧾 Blacklisted Users")
        .setDescription(users);
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
