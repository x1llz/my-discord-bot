import { Events } from "discord.js";

export function registerEvents(client, PREFIX) {
  // Anti double execution cache
  const processedMessages = new Set();

  client.on(Events.MessageCreate, async (message) => {
    try {
      // Ignore bots, DMs, ou messages sans préfixe
      if (!message.guild || message.author.bot) return;
      if (!message.content.startsWith(PREFIX)) return;

      // Anti double trigger (Render bug, slow webhook, etc.)
      if (processedMessages.has(message.id)) return;
      processedMessages.add(message.id);
      setTimeout(() => processedMessages.delete(message.id), 1500);

      // Récupère le nom de commande
      const args = message.content.slice(PREFIX.length).trim().split(/ +/);
      const cmdName = args.shift()?.toLowerCase();
      if (!cmdName) return;

      const command = client.commands.get(cmdName);
      if (!command) return;

      // Exécution de la commande
      await command.execute(message, args, client);
    } catch (err) {
      console.error("⚠️ Error in messageCreate handler:", err);
      try {
        message.reply("❌ An error occurred while executing the command.");
      } catch {}
    }
  });

  // Logs au démarrage
  client.once(Events.ClientReady, () => {
    console.log("✅ Event handler loaded and ready.");
  });
}