const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");
const path = require("path");
const vanityFile = path.join(__dirname, "../../data/vanity.json");

if (!fs.existsSync(vanityFile)) fs.writeFileSync(vanityFile, JSON.stringify({}));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vanity")
    .setDescription("Set a vanity system for your server")
    .addSubcommand(sub =>
      sub
        .setName("set")
        .setDescription("Set the vanity keyword and role")
        .addStringOption(opt =>
          opt.setName("keyword").setDescription("Keyword to detect (ex: hellz)").setRequired(true)
        )
        .addRoleOption(opt =>
          opt.setName("role").setDescription("Role to give").setRequired(true)
        )
        .addChannelOption(opt =>
          opt.setName("channel").setDescription("Channel to send message").setRequired(true)
        )
        .addStringOption(opt =>
          opt
            .setName("message")
            .setDescription("Custom message (use {user.mention}, {role.name}, {keyword})")
            .setRequired(true)
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const keyword = interaction.options.getString("keyword").toLowerCase();
    const role = interaction.options.getRole("role");
    const channel = interaction.options.getChannel("channel");
    const message = interaction.options.getString("message");

    if (channel.type !== ChannelType.GuildText)
      return interaction.reply({ content: "❌ Invalid channel type.", ephemeral: true });

    const vanityData = JSON.parse(fs.readFileSync(vanityFile));
    vanityData[interaction.guild.id] = {
      keyword,
      roleId: role.id,
      channelId: channel.id,
      message,
    };
    fs.writeFileSync(vanityFile, JSON.stringify(vanityData, null, 2));

    await interaction.reply({
      content: `✅ Vanity system set!\nKeyword: **${keyword}**\nRole: ${role}\nChannel: ${channel}`,
      ephemeral: false,
    });
  },
};
