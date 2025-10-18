import { EmbedBuilder, PermissionFlagsBits } from "discord.js";
import fs from "fs";
import path from "path";

const FILE = path.resolve("data", "blacklist.json");
if (!fs.existsSync(path.dirname(FILE))) fs.mkdirSync(path.dirname(FILE), { recursive: true });
if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify({}), "utf8");

function load() { return JSON.parse(fs.readFileSync(FILE, "utf8") || "{}"); }
function save(d) { fs.writeFileSync(FILE, JSON.stringify(d, null, 2)); }

export default {
  name: "bl",
  description: "Blacklist a user ID for this server",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator))
      return message.reply("❌ Administrator permission required.");

    const id = args[0];
    if (!id) return message.reply("⚠️ Provide a user ID to blacklist.");

    const db = load();
    db[message.guild.id] = db[message.guild.id] || [];
    if (db[message.guild.id].includes(id)) return message.reply("⚠️ ID already blacklisted.");

    db[message.guild.id].push(id);
    save(db);

    const embed = new EmbedBuilder()
      .setColor("#e74c3c")
      .setTitle("🔒 Blacklisted")
      .setDescription(`ID **${id}** added to blacklist.`)
      .setFooter({ text: `By ${message.author.tag}` });

    return message.channel.send({ embeds: [embed] });
  },
};