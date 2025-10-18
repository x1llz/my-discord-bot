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
    const categories = ["fun", "moderation", "utility"];
    let commandList = "";

    for (const category of categories) {
      const dir = path.join(__dirname, `../${category}`);
      const files = fs.readdirSync(dir).filter(f => f.endsWith(".js"));

      const cmds =