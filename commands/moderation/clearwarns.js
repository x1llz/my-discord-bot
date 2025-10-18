import { EmbedBuilder, PermissionFlagsBits } from "discord.js";
import fs from "fs";
import path from "path";

const FILE = path.resolve("data", "warns.json");
if (!fs.existsSync(path.dirname(FILE))) fs.mkdirSync(path.dirname(FILE), { recursive: true });
if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify({}), "utf8");

function load() { return JSON.parse(fs.readFileSync(FILE, "utf8") || "{}"); }
function save(d) { fs.writeFileSync(FILE, JSON.stringify(d, null, 2)); }

export default {
  name: "clearwarns",
  description: "Clear all warns for this server",
  async execute(message) {
    if (!message.member.permissions.has(PermissionFlagsBits.KickMembers))
      return message.reply("❌ You don't have permission to clear warns.");

    const data = load();
    data[message.guild.id] = {};
    save(data);

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🧹 Warns Cleared")
      .setDescription("All warning data for this server has been cleared.")
      .setFooter({ text: `By ${message.author.tag}` });

    return message.channel.send({ embeds: [embed] });
  },
};