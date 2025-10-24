const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const warningsPath = path.join(__dirname, "../../warnings.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Manage user warnings.")
    .addSubcommand(sub =>
      sub
        .setName("add")
        .setDescription("Add a warning to a user.")
        .addUserOption(opt =>
          opt.setName("user").setDescription("User to warn.").setRequired(true)
        )
        .addStringOption(opt =>
          opt.setName("reason").setDescription("Reason for the warning.").setRequired(true)
        )
    )
    .addSubcommand(sub =>
      sub
        .setName("list")
        .setDescription("Show all warnings for a specific user.")
        .addUserOption(opt =>
          opt.setName("user").setDescription("User to check.").setRequired(true)
        )
    )
    .addSubcommand(sub =>
      sub
        .setName("logs")
        .setDescription("Show all warnings in this server.")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");
    const moderator = interaction.user.id;

    // Ensure file exists
    if (!fs.existsSync(warningsPath)) fs.writeFileSync(warningsPath, "{}");

    const warningsData = JSON.parse(fs.readFileSync(warningsPath, "utf8"));

    switch (sub) {
      // === /warn add ===
      case "add":
        if (!warningsData[user.id]) warningsData[user.id] = [];
        warningsData[user.id].push({
          reason,
          moderator,
          date: new Date().toISOString(),
        });
        fs.writeFileSync(warningsPath, JSON.stringify(warningsData, null, 2));

        const addEmbed = new EmbedBuilder()
          .setColor("Orange")
          .setTitle(`⚠️ User Warned`)
          .setDescription(`**User:** ${user.tag}\n**Reason:** ${reason}`)
          .setFooter({ text: `Moderator: ${interaction.user.tag}` })
          .setTimestamp();

        await interaction.reply({ embeds: [addEmbed] });
        break;

      // === /warn list ===
      case "list":
        const userWarnings = warningsData[user?.id] || [];
        if (userWarnings.length === 0)
          return interaction.reply({
            content: `✅ ${user.tag} has no warnings.`,
            ephemeral: true,
          });

        const listEmbed = new EmbedBuilder()
          .setColor("Red")
          .setTitle(`⚠️ Warnings for ${user.tag}`)
          .setDescription(
            userWarnings
              .map(
                (warn, i) =>
                  `**#${i + 1}** – ${warn.reason}\nModerator: <@${warn.moderator}>`
              )
              .join("\n\n")
          )
          .setFooter({ text: `Total warnings: ${userWarnings.length}` })
          .setTimestamp();

        await interaction.reply({ embeds: [listEmbed], ephemeral: true });
        break;

      // === /warn logs ===
      case "logs":
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator))
          return interaction.reply({
            content: "❌ You need Administrator permission to use this command.",
            ephemeral: true,
          });

        const allUsers = Object.entries(warningsData)
          .map(
            ([id, warns]) => `<@${id}> — ${warns.length} warning(s)`
          )
          .join("\n");

        if (!allUsers)
          return interaction.reply({ content: "No warnings found.", ephemeral: true });

        const logsEmbed = new EmbedBuilder()
          .setColor("Blue")
          .setTitle("📜 Server Warning Logs")
          .setDescription(allUsers)
          .setTimestamp();

        await interaction.reply({ embeds: [logsEmbed], ephemeral: true });
        break;
    }
  },
};