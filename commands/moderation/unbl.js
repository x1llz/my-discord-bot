const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");
const path = require("path");
const FILE = path.resolve("data","blacklist.json");

function load(){ return JSON.parse(fs.readFileSync(FILE,"utf8")||"{}"); }
function save(d){ fs.writeFileSync(FILE, JSON.stringify(d, null, 2)); }

module.exports = {
  name: "unbl",
  description: "Remove user from blacklist 🔓",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator))
      return message.reply("❌ You need Administrator permission.");

    const id = args[0];
    if (!id) return message.reply("⚠️ Provide a user ID to unblacklist.");

    const db = load();
    if (!db[message.guild.id] || !db[message.guild.id].includes(id)) return message.reply("⚠️ ID not found in blacklist.");

    db[message.guild.id] = db[message.guild.id].filter(x => x !== id);
    save(db);

    const embed = new EmbedBuilder().setColor("#2ecc71").setTitle("🔓 User Unblacklisted").setDescription(`ID **${id}** removed from blacklist.`).setFooter({ text: `By ${message.author.tag}` });
    message.channel.send({ embeds: [embed] });
  },
};