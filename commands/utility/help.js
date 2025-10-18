import { EmbedBuilder } from "discord.js";

export default {
  name: "help",
  description: "Show all available commands 💡",
  /**
   * execute(message, args, client)
   * - uses client.commands (the Collection loaded by your handler)
   * - dedupes by command name
   * - groups by command.category (if set), otherwise 'General'
   */
  async execute(message, args, client) {
    try {
      // get commands from the client's collection
      const allCommands = Array.from(client.commands.values());

      // dedupe by name (in case duplicates slipped in)
      const uniq = new Map();
      for (const c of allCommands) {
        if (!uniq.has(c.name)) uniq.set(c.name, c);
      }

      // group by category
      const groups = {};
      for (const cmd of uniq.values()) {
        const cat = cmd.category ? String(cmd.category).toLowerCase() : "general";
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(cmd);
      }

      // build description with categories sorted
      const sortedCats = Object.keys(groups).sort();
      let description = "";
      for (const cat of sortedCats) {
        const cmds = groups[cat]
          .map((c) => `\`+${c.name}\` — ${c.description ?? "No description"}`)
          .join("\n");
        description += `__**${cat.toUpperCase()}**__\n${cmds}\n\n`;
      }

      if (!description) description = "No commands available.";

      const embed = new EmbedBuilder()
        .setColor("#3498db")
        .setTitle("💫 Hellz Command Center")
        .setDescription(description)
        .addFields(
          { name: "✨ Prefix", value: "`+`", inline: true },
          { name: "🧠 Total Commands", value: `${uniq.size}`, inline: true }
        )
        .setFooter({ text: `Requested by ${message.author.tag} • Made by X1LLZ` })
        .setTimestamp();

      // send a single message (prevents double-send)
      await message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error("help command error:", err);
      try {
        await message.reply("⚠️ An error occurred while building the help list.");
      } catch {}
    }
  },
};