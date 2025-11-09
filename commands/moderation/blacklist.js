// commands/moderation/blacklist.js
const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const blacklistFile = path.join(__dirname, "../../data/blacklist.json");
const adminsFile = path.join(__dirname, "../../data/admins.json");

if (!fs.existsSync(blacklistFile)) fs.writeFileSync(blacklistFile, JSON.stringify([]));
if (!fs.existsSync(adminsFile)) fs.writeFileSync(adminsFile, JSON.stringify([]));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("blacklist")
    .setDescription("Blacklist or unblacklist a user from using the bot (admins/owner only)")
    .addSubcommand(sub =>
      sub
        .setName("add")
        .setDescription("Add a user to the blacklist")
        .addUserOption(opt =>
          opt.setName("user").setDescription("User to blacklist").setRequired(true)
        )
    )
    .addSubcommand(sub =>
      sub
        .setName("remove")
        .setDescription("Remove a user from the blacklist")
        .addUserOption(opt =>
          opt.setName("user").setDescription("User to unblacklist").setRequired(true)
        )
    ),

  async execute(interaction) {
    const ownerId = "1187100546683899995";
    const admins = JSON.parse(fs.readFileSync(adminsFile));
    const user = interaction.user;

    if (user.id !== ownerId && !admins.includes(user.id))
      return interaction.reply({ content: "❌ You are not authorized to use this command.", ephemeral: true });

    const sub = interaction.options.getSubcommand();
    const target = interaction.options.getUser("user");
    let blacklist = JSON.parse(fs.readFileSync(blacklistFile));

    if (sub === "add") {
      if (blacklist.includes(target.id))
        return interaction.reply({ content: `${target.tag} is already blacklisted.`, ephemeral: true });

      blacklist.push(target.id);
      fs.writeFileSync(blacklistFile, JSON.stringify(blacklist, null, 2));
      return interaction.reply({ content: `🚫 ${target.tag} has been blacklisted.`, ephemeral: false });
    }

    if (sub === "remove") {
      if (!blacklist.includes(target.id))
        return interaction.reply({ content: `${target.tag} is not blacklisted.`, ephemeral: true });

      blacklist = blacklist.filter(id => id !== target.id);
      fs.writeFileSync(blacklistFile, JSON.stringify(blacklist, null, 2));
      return interaction.reply({ content: `✅ ${target.tag} has been r
