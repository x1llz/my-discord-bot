import { EmbedBuilder } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  name: "help",
  description: "Show all available commands 💡",
  async execute(message) {
    const folders = fs.readdirSync(path.join(__dirname, "../"));
    let commandsList = "";

    for (const folder of folders) {
      const files = fs
        .readdirSync(path.join(__dirname, "../", folder))
        .filter(f => f.endsWith(".js"));

      for (const file of files) {
        const command = await import(`../${folder}/${file}`);
        if (command.default && command.default.name && command.default.description) {
          commandsList += `> **+${command.default.name}** — ${command.default.description}\n`;
        }
      }
    }

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("💫 Hellz Command Center")
      .setDescription(`Hey **${message.author.username}**, here’s all my commands:\n\n${commandsList}`)
      .setFooter({ text: "Made by X1LLZ 💻 | discord.gg/hellz" })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};