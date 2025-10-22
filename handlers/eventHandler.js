export function registerEvents(client, PREFIX) {
  client.on("messageCreate", async message => {
    if (!message.guild || message.author.bot) return;

    // Anti-duplication
    if (client._recentMessages.has(message.id)) return;
    client._recentMessages.add(message.id);
    setTimeout(() => client._recentMessages.delete(message.id), 1500);

    if (!message.content.startsWith(PREFIX)) return;
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const cmdName = args.shift()?.toLowerCase();

    const command = client.commands.get(cmdName);
    if (!command) return;

    try {
      await command.execute(message, args, client);
    } catch (err) {
      console.error(`❌ Error executing ${cmdName}:`, err);
      message.reply("⚠️ There was an error executing this command.");
    }
  });

  client.once("ready", () => {
    console.log("✅ Event handler active");
  });
}