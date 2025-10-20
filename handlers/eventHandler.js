/**
 * Event handler for message commands
 */
export function registerEvents(client, PREFIX) {
  client.on("messageCreate", async (message) => {
    try {
      if (!message.guild || message.author.bot) return;
      if (!message.content.startsWith(PREFIX)) return;

      const args = message.content.slice(PREFIX.length).trim().split(/ +/);
      const cmdName = args.shift()?.toLowerCase();
      const command = client.commands.get(cmdName);

      if (!command) return;

      await command.execute(client, message, args);
    } catch (error) {
      console.error("⚠️ Command execution error:", error);
      message.reply("❌ Something went wrong executing this command.");
    }
  });

  client.on("ready", () => {
    console.log(`✅ Event system ready for ${client.user.tag}`);
  });
}