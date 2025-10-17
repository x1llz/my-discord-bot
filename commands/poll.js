// commands/utility/poll.js
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
module.exports = {
  name: "poll",
  description: "Create a poll / Créer un sondage",
  usage: "+poll duration question | option1 | option2 | ... (max 10)",
  async execute(message, args) {
    // format: +poll 1h Question | yes | no | maybe
    const raw = args.join(" ");
    if (!raw.includes("|")) return message.reply("⚠️ Usage: +poll 1h Question | opt1 | opt2 / Exemple: +poll 1h Do you? | Yes | No");
    const [timePart, rest] = [args[0], raw.slice(raw.indexOf(" ")+1)];
    const duration = timePart;
    const ms = require("ms")(duration);
    if (!ms) return message.reply("⏰ Invalid duration / Durée invalide.");
    const parts = rest.split("|").map(p=>p.trim()).filter(Boolean);
    if (parts.length < 2 || parts.length > 10) return message.reply("⚠️ Provide 2-10 options / Donne 2 à 10 options.");

    const question = parts.shift();
    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("📊 Poll / Sondage")
      .setDescription(`❓ **${question}**\n\n${parts.map((o,i)=>`${i+1}. ${o}`).join("\n")}`)
      .setFooter({ text: `Poll by ${message.author.tag} • Ends in ${duration}` }).setTimestamp();
    const sent = await message.channel.send({ embeds: [embed] });

    const emojis = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"];
    for (let i=0;i<parts.length;i++) await sent.react(emojis[i]);

    // finish
    setTimeout(async ()=>{
      const s = await sent.fetch();
      const results = parts.map((o,i)=>{
        const r = s.reactions.cache.get(emojis[i]);
        const cnt = r ? r.count-1 : 0;
        return { option: o, votes: cnt };
      });
      const resultEmbed = new EmbedBuilder()
        .setColor("#2ecc71")
        .setTitle("📊 Poll results / Résultats du sondage")
        .setDescription(results.map(r=>`${r.option} — **${r.votes}**`).join("\n"))
        .setFooter({ text: `Poll ended • ${message.author.tag}` }).setTimestamp();
      message.channel.send({ embeds: [resultEmbed] });
    }, ms);
  },
};