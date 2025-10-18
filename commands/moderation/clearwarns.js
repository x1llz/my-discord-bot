const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const path = require("path");
const fs = require("fs");
const FILE = path.resolve("data", "warns.json");
if (!fs.existsSync(path.dirname(FILE))) fs.mkdirSync(path.dirname(FILE), { recursive: true });
if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify({}), "utf8");

function load() { return JSON.parse(fs.readFileSync(FILE,"utf8")||"{}"); }
function save(d) { fs.writeFileSync(FILE, JSON.stringify(d, null, 2)); }

module.exports = {
  name: "clearwarns",
  description: "Clear all warns for the server",
  async execute(message) {
    if (!message.member.permissions.has(PermissionFlagsBits.KickMembers))
      return message.reply("❌ You don't have permission to clear warns.");

    const data = load();
    data[message.guild.id] = {}; // clear for this guild
    save(data);

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🧹 All warns cleared")
      .setDescription("All warning data for this server has been cleared.")
      .setFooter({ text: `Cleared by ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};