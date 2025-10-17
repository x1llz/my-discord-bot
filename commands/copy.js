// commands/utility/copy.js
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "copy",
  description: "Copy an emoji or sticker from another server / Copier un emoji ou sticker d’un autre serveur",
  usage: "+copy <emoji/emoji_id/URL>",

  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageEmojisAndStickers)) {
      return message.reply("❌ You need the `Manage Emojis and Stickers` permission / Tu dois pouvoir gérer les emojis et stickers.");
    }

    if (!args.length)
      return message.reply("⚠️ Usage: `+copy <emoji/