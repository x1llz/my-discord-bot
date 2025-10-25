const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roles")
    .setDescription("Manage roles on the server")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .setDMPermission(false)
    // /roles info
    .addSubcommand(sub =>
      sub
        .setName("info")
        .setDescription("Show information about a specific role")
        .addRoleOption(opt => opt.setName("role").setDescription("Select the role").setRequired(true))
    )
    // /roles role
    .addSubcommand(sub =>
      sub
        .setName("role")
        .setDescription("Add or remove a role from a user")
        .addUserOption(opt => opt.setName("user").setDescription("Select the user").setRequired(true))
        .addRoleOption(opt => opt.setName("role").setDescription("Select the role").setRequired(true))
    )
    // /roles all
    .addSubcommand(sub =>
      sub
        .setName("all")
        .setDescription("Add or remove a role for everyone")
        .addRoleOption(opt => opt.setName("role").setDescription("Select the role").setRequired(true))
        .addStringOption(opt =>
          opt
            .setName("action")
            .setDescription("Choose what to do")
            .setRequired(true)
            .addChoices(
              { name: "Add to everyone", value: "add" },
              { name: "Remove from everyone", value: "remove" }
            )
        )
    )
    // /roles autorole
    .addSubcommand(sub =>
      sub
        .setName("autorole")
        .setDescription("Set or reset the automatic role for new members")
        .addRoleOption(opt => opt.setName("role").setDescription("Role to auto-assign").setRequired(true))
    ),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const role = interaction.options.getRole("role");
    const member = interaction.options.getMember("user");
    const action = interaction.options.getString("action");

    if (sub === "info") {
      const embed = new EmbedBuilder()
        .setColor(role.color || 0x2f3136)
        .setTitle(`Role: ${role.name}`)
        .addFields(
          { name: "ID", value: role.id, inline: true },
          { name: "Color", value: role.hexColor, inline: true },
          { name: "Members", value: `${role.members.size}`, inline: true },
          { name: "Created", value: `<t:${Math.floor(role.createdTimestamp / 1000)}:R>`, inline: false }
        );
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (sub === "role") {
      if (!member) return interaction.reply({ content: "User not found.", ephemeral: true });
      if (member.roles.cache.has(role.id)) {
        await member.roles.remove(role.id);
        return interaction.reply(`Removed role ${role} from ${member}.`);
      } else {
        await member.roles.add(role.id);
        return interaction.reply(`Added role ${role} to ${member}.`);
      }
    }

    if (sub === "all") {
      const members = await interaction.guild.members.fetch();
      let count = 0;
      if (action === "add") {
        for (const [, m] of members) {
          if (!m.user.bot && !m.roles.cache.has(role.id)) {
            await m.roles.add(role).catch(() => {});
            count++;
          }
        }
        return interaction.reply(`✅ Added ${role} to ${count} members.`);
      } else {
        for (const [, m] of members) {
          if (m.roles.cache.has(role.id)) {
            await m.roles.remove(role).catch(() => {});
            count++;
          }
        }
        return interaction.reply(`✅ Removed ${role} from ${count} members.`);
      }
    }

    if (sub === "autorole") {
      const fs = require("fs");
      const path = "./data/autorole.json";
      let data = {};
      if (fs.existsSync(path)) data = JSON.parse(fs.readFileSync(path, "utf8"));
      data[interaction.guild.id] = role.id;
      fs.writeFileSync(path, JSON.stringify(data, null, 2));
      return interaction.reply(`✅ Autorole set to ${role}.`);
    }
  },
};