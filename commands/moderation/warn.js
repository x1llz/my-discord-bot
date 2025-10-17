// ✅ commands/moderation/warn.js
import { EmbedBuilder, PermissionFlagsBits } from "discord.js";
import ms from "ms";

export default {
  name: "warn",
  description: "Warn a member ⚠️",
  async execute(message, args) {
    // Vérif permissions
    if (!message.member.permissions.has(PermissionFlagsBits.KickMembers))
      return message.reply("❌ You don’t have permission to warn members.");

    const target = message.mentions.members.first();
    if (!target) return message.reply("⚠️ Mention a user to warn.");

    const reason = args.slice(1).join(" ") || "No reason provided";

    // Construction de l’embed
    const embed = new EmbedBuilder()
      .setColor("#ffcc00")
      .set