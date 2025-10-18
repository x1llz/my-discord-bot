import { EmbedBuilder, PermissionFlagsBits } from "discord.js";
import fs from "fs";
import path from "path";

const FILE = path.resolve("data", "warns.json");
if (!fs.existsSync(path.dirname(FILE))) fs.mkdirSync(path.dirname(FILE), { recursive: true });
if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify({}), "utf8");

function load() { return JSON.parse(fs.readFileSync(FILE, "utf8") || "{}"); }
function save(d) { fs.writeFileSync(FILE, JSON.stringify(d, null, 2)); }

export default {
  name: "delwarn",
  description: "Delete a specific warning for a user",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.KickMembers))
      return message.reply("❌ You don't have permission to delete warns.");

    const target = message.mentions.members.first();
    const idx = parseInt(args[1], 10) - 1;
    if (!target) return message.reply("⚠️ Mention a user.");
    if (isNaN(idx)) return message.reply("⚠️ Provide the warn number to delete (e.g. +delwarn @user 2).");

    const db = load();
    const guildData = db[message.guild.id] || {};
    const userWarns = guildData[target.id] || [];

    if (!userWarns[idx]) return message.reply("❌ That warning number does not exist.");

    const removed = userWarns.splice(idx, 1);
    guildData[target.id] = userWarns;
    db[message.guild.id] = guildData;
    save(db);

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🗑️ Warning Removed")
      .setDescription(`Removed warning **${removed[0].reason || "No reason"}** from **${target.user.tag}**`)
      .setFooter({ text: `By ${message.author.tag}` });

    return message.channel.send({ embeds: [embed] });
  },
};