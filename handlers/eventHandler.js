import ms from "ms";

export function registerEvents(client, PREFIX) {
  client.on("messageCreate", async (message) => {
    if (!message.guild || message.author.bot) return;

    // prevent duplicate events
    if (client._recentMessages.has(message.id)) return;
    client._recentMessages.add(message.id);
    setTimeout(() => client._recentMessages.delete(message.id), 1500);

    // handle AFK auto remove
    if (client.afk.has(message.author.id)) {
      const old = client.afk.get(message.author.id);
      client.afk.delete(message.author.id);
      message.reply(`✅ Welcome back ${message.author.username}, AFK removed (was: ${old.reason}).`);
    }

    // mention AFK users
    if (message.mentions.users.size > 0) {
      message.mentions.users.forEach((u) => {
        if (client.afk.has(u.id)) {
          const data = client.afk.get(u.id);
          const minutes = Math.floor((Date.now() - data.since) / 60000);
          message.reply(`💤 ${u.tag} is AFK: **${data.reason}** (${minutes} min ago)`);
        }
      });
    }

    // commands
    if (!message.content.startsWith(PREFIX)) return;
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const cmdName = args.shift()?.toLowerCase();
    if (!cmdName) return;

    const command = client.commands.get(cmdName);
    if (!command) return;

    try {
      await command.execute(message, args, client);
    } catch (err) {
      console.error("❌ Command error:", err);
      message.reply("⚠️ An error occurred while executing this command.");
    }
  });
}