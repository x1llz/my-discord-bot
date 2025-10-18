import { Events } from "discord.js";

export function registerEvents(client, prefix) {
  client.on(Events.MessageCreate, async (message) => {
    try {
      // ignore bots & DMs
      if (!message.guild || message.author.bot) return;

      // anti duplicate (fix double execute)
      if (client._recentMessages.has(message.id)) return;
      client._recentMessages.add(message.id);
      setTimeout(() => client._recentMessages.delete(message.id), 1500);

      // not a command
      if (!message.content.startsWith(prefix)) return;

      // parse
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const cmdName = args.shift()?.toLowerCase();
      if (!cmdName) return;

      const command = client.commands.get(cmdName);
      if (!command) return;

      // execute once
      await command.execute(message, args, client);
    } catch (err) {
      console.error("MessageCreate Error:", err);
      try {
        await message.reply("⚠️ Something went wrong executing that command.");
      } catch {}
    }
  });
}