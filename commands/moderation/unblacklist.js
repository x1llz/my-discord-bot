// commands/moderation/unblacklist.js
const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const blacklistFile = path.join(__dirname, "../../data/blacklist.json");
const adminsFile = path.join(__dirname, "../../data/admins.json");

if (!fs.existsSync(blacklistFile)) fs.writeFileSync(blacklistFile, JSON.stringify([]));
if (!fs.existsSync(adminsFile)) fs.writeFileSync(adminsFile, JSON.stringify([]));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unblacklist")
    .setDescription("Remove a user from the bot blacklist (owner/admins only)")
    .addUserOption(opt =>
      opt.setName("user").setDescription("User to unblacklist").setRequired(true)
    ),

  async execute(interaction) {
    const ownerId = "1187100546683899995";
    const admins = JSON.parse(fs.readFileSync(adminsFile));
    const user = interaction.user;

    if (user.id !== ownerId && !admins.includes(user.id))
      return interaction.reply({ content: "❌ You are not authorized.", ephemeral: true });

    const target = interaction.options.getUser("user");
    let blacklist = JSON.parse(fs.readFileSync(blacklistFile));

    if (!blacklist.includes(target.id))
      return interaction.reply({ content: `${target.tag} is not blacklisted.`, ephemeral: true });

    blacklist = blacklist.filter(id => id !== target.id);
    fs.writeFileSync(blacklistFile, JSON.stringify(blacklist, null, 2));

    await interaction.reply({ content: `✅ ${target.tag} removed from blacklist.`, ephemeral: false });
  },
};
