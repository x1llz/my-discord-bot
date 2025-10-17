// commands/utility/giveawayreroll.js
const fs = require("fs");
const path = require("path");
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const GW_FILE = path.resolve("data", "giveaways.json");

function loadGiveaways(){ return JSON.parse(fs.readFileSync(GW_FILE,"utf8")||"[]"); }

module.exports = {
  name: "giveawayreroll",
  description: "Reroll a giveaway / Relancer un giveaway",
  usage: "+giveawayreroll <giveawayId>",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageGuild))
      return message.reply("❌ You need Manage Server / Tu dois pouvoir gérer le serveur.");

    const id = args[0];
    if (!id) return message.reply("⚠️ Provide giveaway ID / Donne l'ID du giveaway.");

    const g = loadGiveaways();
    const item = g.find(x=>x.id===id);
    if (!item) return message.reply("❌ Giveaway not found / Giveaway introuvable.");

    const ch = message.client.channels.cache.get(item.channelId);
    if (!ch) return message.reply("⚠️ Channel not found / Salon introuvable.");

    const msg = await ch.messages.fetch(item.messageId).catch(()=>null);
    if (!msg) return message.reply("⚠️ Giveaway message not found / Message du giveaway introuvable.");

    const reaction = msg.reactions.cache.get("🎉");
    if (!reaction) return message.reply("⚠️ No entries / Pas de participations.");

    const users = (await reaction.users.fetch()).filter(u=>!u.bot).map(u=>u.id);
    if (!users.length) return message.reply("⚠️ No valid participants / Pas de participants valides.");

    const winnersList = [];
    while (winnersList.length < item.winners && users.length) {
      const pick = users.splice(Math.floor(Math.random()*users.length),1)[0];
      if (!winnersList.includes(pick)) winnersList.push(pick);
    }
    const mentionWinners = winnersList.map(id=>`<@${id}>`).join(" ");
    const doneEmbed = new EmbedBuilder()
      .setColor("#2ecc71")
      .setTitle("🔁 Giveaway Rerolled / Giveaway relancé")
      .setDescription(`🏆 New winners: ${mentionWinners}\n🎁 Prize: ${item.prize}`)
      .setFooter({ text: `ID: ${item.id}` }).setTimestamp();
    ch.send({ embeds: [doneEmbed] });
    message.reply("✅ Reroll done / Relance effectuée.");
  },
};