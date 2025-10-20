import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function registerEvents(client, PREFIX) {
  client.on("messageCreate", async message => {
    if (!message.guild || message.author.bot) return;

    // Anti double exécution
    if (client._recentMessages.has(message.id)) return;
    client._recentMessages.add(message.id);
    setTimeout(() => client._recentMessages.delete(message.id), 1500);

    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();
    const command = client.commands.get(commandName);

    if (!command) return;

    try {
      await command.execute(message, args, client);
    } catch (err) {
      console.error(`❌ Error executing command: ${commandName}`, err);
      message.reply("⚠️ An error occurred while executing that command.");
    }
  });

  client.once("ready", () => {
    console.log(`🌸 Logged in as ${client.user.tag}`);
  });
}