export function registerEvents(client, prefix) {
  // === Message Handler ===
  client.on("messageCreate", async (message) => {
    if (!message.guild || message.author.bot) return;

    // Anti double-event
    if (client._recentMessages.has(message.id)) return;
    client._recentMessages.add(message.id);
    setTimeout(() => client._recentMessages.delete(message.id), 1500);

    // AFK management
    if (client.afk.has(message.author.id)) {
      const old = client.afk.get(message.author.id);
      client.afk.delete(message.author.id);
      message.reply(`✅ Welcome back ${message.author.username}, AFK removed (was: ${old.reason}).`);
    }

    // Mention AFK users
    if (message.mentions.users.size > 0) {
      message.mentions.users.forEach((u) => {
        if (client.afk.has(u.id)) {
          const data = client.afk.get(u.id);
          const minutes = Math.floor((Date.now() - data.since) / 60000);
          message.reply(`💤 ${u.tag} is AFK: **${data.reason}** (${minutes} min ago)`);
        }
      });
    }

    // Command execution
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmdName = args.shift()?.toLowerCase();
    if (!cmdName) return;

    const command = client.commands.get(cmdName);
    if (!command) return;

    try {
      await command.execute(message, args, client);
    } catch (err) {
      console.error(`⚠️ Error executing ${cmdName}:`, err);
      message.reply("❌ An error occurred while executing this command.");
    }
  });

  // === Snipe Deleted Messages ===
  client.on("messageDelete", (message) => {
    if (!message.guild || message.author?.bot) return;
    client.snipes.set(message.channel.id, {
      content: message.content || null,
      author: message.author,
      image: message.attachments.first()?.proxyURL || null,
      time: Date.now(),
    });
  });
}