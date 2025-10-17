// commands/utility/say.js
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
module.exports = {
  name: "say",
  description: "Make the bot say something / Faire parler le bot",
  usage: "+say #channel Message or +say Message",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages))
      return message.reply("❌ You need Manage Messages / Tu dois pouvoir gérer les messages.");
    if (!args.length) return message.reply("⚠️ Provide text / Donne un texte.");
    // optional channel mention first
    const channel = message.mentions.channels.first() || message.channel;
    const text = args.filter(a=>!a.startsWith("<#")).join(" ");
    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setDescription(text)
      .setFooter({ text: `Announced by ${message.author.tag} • Hellz` })
      .setTimestamp();
    channel.send({ embeds: [embed] });
    if (channel.id !== message.channel.id) message.reply("✅ Message sent / Message envoyé.");
  },
};