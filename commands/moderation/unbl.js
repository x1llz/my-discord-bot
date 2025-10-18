import { EmbedBuilder, PermissionFlagsBits } from "discord.js";
import fs from "fs";
import path from "path";

const FILE = path.resolve("data", "blacklist.json");
function load() { return JSON.parse(fs.readFileSync(FILE, "utf8") || "{}"); }
function save(d) { fs.writeFileSync(FILE, JSON.stringify(d, null, 2)); }

export default {
  name: "unbl",
  description: "Remove an ID from the blacklist",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator))
      return message.reply("❌ Administrator permission required.");

    const id = args[0];
    if (!id) return message.reply("⚠️ Provide a user ID to remove.");

    const db = load();
    db[message.guild.id] = (db[message.guild.id] || []).filter(x => x !== id);
    save(db);

    const embed = new EmbedBuilder()
      .setColor("#2ecc71")
      .setTitle("🔓 Unblacklisted")
      .setDescription(`ID **${id}** removed from blacklist.`)
      .setFooter({ text: `By ${message.author.tag}` });

    return message.channel.send({ embeds: [embed] });
  },
};