// commands/utility/emojis.js
module.exports = {
  name: "emojis",
  description: "List server emojis / Lister les emojis du serveur",
  async execute(message) {
    const emojis = message.guild.emojis.cache.map(e=>`${e} \`${e.name}\` (${e.id})`);
    if (!emojis.length) return message.reply("⚠️ No emojis / Aucun emoji.");
    const chunk = [];
    for (let i=0;i<emojis.length;i+=50) chunk.push(emojis.slice(i, i+50).join("\n"));
    for (const page of chunk) {
      await message.channel.send({ content: page });
    }
  },
};