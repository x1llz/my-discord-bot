require("dotenv").config();
const { REST, Routes } = require("discord.js");

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("🧹 Clearing ALL commands (guild + global)...");
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: [] }
    );
    console.log("✅ Guild commands cleared.");
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] });
    console.log("✅ Global commands cleared.");
    console.log("✨ All slash commands removed successfully. Now restart the bot.");
  } catch (err) {
    console.error("❌ Failed to clear commands:", err);
  }
})();