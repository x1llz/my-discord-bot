// commands/utility/giveaway.js
const fs = require("fs");
const path = require("path");
const ms = require("ms");
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const DATA = path.resolve("data");
if (!fs.existsSync(DATA)) fs.mkdirSync(DATA);
const GW_FILE = path.join(DATA, "giveaways.json");
if (!fs.existsSync(GW_FILE)) fs.writeFileSync(GW_FILE, JSON.stringify([]));

function loadGiveaways(){ return JSON.parse(fs.readFileSync(GW_FILE,"utf8")||"[]"); }
function saveGiveaways(g){ fs.writeFileSync(GW_FILE, JSON.stringify(g, null, 2)); }

module.exports = {
  name: "giveaway",
  description: "Create a giveaway / Créer un giveaway",
  usage: "+giveaway #channel duration winners prize (ex: +giveaway #give 1h 2 Nitro)",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageGuild))
      return message.reply("❌ You need Manage Server / Tu dois pouvoir gérer le serveur.");

    const channel = message.mentions.channels.first();
    if (!channel) return message.reply("⚠️ Mention a channel / Mentionne un salon.");
    const duration = args[1];
    const winners = parseInt(args[2]);
    const prize = args.slice(3).join(" ");
    if (!duration || !winners || !prize) return message.reply("⚠️ Usage: +giveaway #chan 1h 1 Prize / Exemple: +giveaway #give 1h 1 Nitro");

    const msDur = ms(duration);
    if (!msDur) return message.reply("⏰ Invalid duration / Durée invalide.");

    const endAt = Date.now() + msDur;
    const id = `${Date.now()}`;

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🎉 New Giveaway / Nouveau Giveaway")
      .setDescription(`🎁 **Prize / Prix:** ${prize}\n🕒 **Duration / Durée:** ${duration}\n🏆 **Winners / Gagnants:** ${winners}`)
      .setFooter({ text: `Giveaway ID: ${id} • Made by X1LLZ | discord.gg/hellz` })
      .setTimestamp();

    const sent = await channel.send({ content: `React 🎉 to enter! / Réagis 🎉 pour participer!`, embeds: [embed] });
    await sent.react("🎉");

    // store giveaway
    const g = loadGiveaways();
    g.push({ id, channelId: channel.id, messageId: sent.id, prize, winners, endAt, ended:false });
    saveGiveaways(g);

    message.reply(`✅ Giveaway created (ID: ${id}) / Giveaway créé (ID: ${id}).`);

    // schedule finish (in-memory; if bot restarts we'll rely on rerun scanning)
    setTimeout(async () => {
      try {
        const latest = loadGiveaways();
        const item = latest.find(x=>x.id===id);
        if (!item || item.ended) return;
        const ch = message.client.channels.cache.get(item.channelId);
        if (!ch) return;
        const msg = await ch.messages.fetch(item.messageId).catch(()=>null);
        if (!msg) return;
        const reaction = msg.reactions.cache.get("🎉");
        if (!reaction) {
          ch.send("⚠️ No entries / Pas de participation.");
          item.ended = true; saveGiveaways(latest); return;
        }
        const users = (await reaction.users.fetch()).filter(u=>!u.bot).map(u=>u.id);
        if (!users.length) {
          ch.send("⚠️ No valid participants / Pas de participants valides.");
          item.ended = true; saveGiveaways(latest); return;
        }
        // pick winners
        const winnersList = [];
        while (winnersList.length < item.winners && users.length) {
          const pick = users.splice(Math.floor(Math.random()*users.length),1)[0];
          if (!winnersList.includes(pick)) winnersList.push(pick);
        }
        const mentionWinners = winnersList.map(id=>`<@${id}>`).join(" ");
        const doneEmbed = new EmbedBuilder()
          .setColor("#2ecc71")
          .setTitle("🎉 Giveaway Ended / Giveaway terminé")
          .setDescription(`🏆 Winners: ${mentionWinners}\n🎁 Prize: ${item.prize}`)
          .setFooter({ text: `ID: ${item.id}` }).setTimestamp();
        ch.send({ content: `Congrats! / GG!`, embeds: [doneEmbed] });
        item.ended = true;
        saveGiveaways(latest);
      } catch (e) { console.error("giveaway finish err", e); }
    }, msDur);
  },
};