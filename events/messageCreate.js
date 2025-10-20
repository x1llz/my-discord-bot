export default {
  name: "messageCreate",
  async execute(message, client, prefix) {
    if (!message.guild || message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();
    if (!commandName) return;

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      await command.execute(message, args, client);
    } catch (error) {
      console.error(`❌ Error executing command '${commandName}':`, error);
      await message.reply("⚠️ An error occurred while running this command.");
    }
  },
};