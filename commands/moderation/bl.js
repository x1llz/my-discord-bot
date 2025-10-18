const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");
const path = require("path");
const FILE = path.resolve("data","blacklist.json");
if (!fs.existsSync(path.dirname(FILE))) fs.mkdirSync(path.dirname(FILE), { recursive: true });
if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify({}), "utf8");

function load(){ return JSON.parse(fs.readFileSync(FILE,"utf8")||"{}"); }
function save(d){ fs.writeFileSync(FILE, JSON.stringify(d, null, 2)); }

module.exports = {
  name: "bl",
  description: "Blacklist a user from this bot (cannot rejoin features) 🔒",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator))
      return message.reply("❌ You need Administrator permission.");

    const id = args[0];
    if (!id) return message.reply("⚠️ Provide a user ID to blacklist.");

    const db = load();
    if (!db[message.guild.id]) db[message.guild.id] = [];
    if (db[message.guild.id].includes(id)) return message.reply("⚠️ This ID is already blacklisted.");

    db[message.guild.id].push(id);
    save(db);

    const embed = new EmbedBuilder().setColor("#e74c3c").setTitle("🔒 User Blacklisted").setDescription(`ID **${id}** has been blacklisted.`).setFooter({ text: `By ${message.author.tag}` });
    message.channel.send({ embeds: [embed] });
  },
};