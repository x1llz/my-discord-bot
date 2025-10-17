export function registerEvents(client, prefix = "+") {
  client.on("messageDelete", (message) => {
    if (!message.guild || message.author?.bot) return;
    client.snipes.set(message.channel.id, {
      content: message.content || null,
      author: message.author,
      image: message.attachments.first()?.proxyURL || null,
      time: Date.now(),
    });
  });

  client.on("messageCreate", async (message) => {
    if (!message.guild || message.author.bot) return;

    // anti-duplicate short window
    if (client._recentMessages.has(message.id)) return;
    client._recentMessages.add(message.id);
    setTimeout(() => client._recentMessages.delete(message.id), 1500);

    // AFK return remove
    if (client.afk.has(message.author.id)) {
      const old = client.afk.get(message.author.id);
      client.afk.delete(message.author.id);
      message.reply(`✅ Welcome back ${message.author.username}, AFK removed (was: ${old.reason}).`);
    }

    // mention AFK notifier
    if (message.mentions.users.size > 0) {
      message.mentions.users.forEach(u => {
        if (client.afk.has(u.id)) {
          const data = client.afk.get(u.id);
          const minutes = Math.floor((Date.now() - data.since) / 60000);
          message.reply(`💤 ${u.tag} is AFK: **${data.reason}** (${minutes} min ago)`);
        }
      });
    }

    // commands (prefix)
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const name = args.shift().toLowerCase();
    const cmd = client.commands.get(name);
    if (!cmd) return;

    try {
      await cmd.execute(message, args, client);
    } catch (err) {
      console.error("Command exec error:", err);
      try { message.reply("⚠️ An error occurred while executing the command."); } catch {}
    }
  });
}
