export function registerEvents(client, PREFIX) {
  client.removeAllListeners("messageCreate");

  client.on("messageCreate", async (message) => {
    try {
      if (!message.guild || message.author.bot) return;
      if (!message.content.startsWith(PREFIX)) return;

      const args = message.content.slice(PREFIX.length).trim().split(/ +/);
      const cmdName = args.shift()?.toLowerCase();
      const command = client.commands.get(cmdName);
      if (!command) return;

      await command.execute(message, args, client);
    } catch (error) {
      console.error("⚠️ Command error:", error);
      message.reply("❌ There was an error executing this command.");
    }
  });

  client.once("ready", () => {
    console.log(`✅ Event handler registered for ${client.user.tag}`);
  });
}