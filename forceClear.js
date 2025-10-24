require("dotenv").config();
const { REST, Routes } = require("discord.js");

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("🔍 Fetching all commands...");
    const guildCommands = await rest.get(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID)
    );
    const globalCommands = await rest.get(Routes.applicationCommands(process.env.CLIENT_ID));

    console.log(`🧹 Found ${guildCommands.length} guild and ${globalCommands.length} global commands.`);

    // Delete guild commands one by one
    for (const cmd of guildCommands) {
      await rest.delete(
        Routes.applicationGuildCommand(process.env.CLIENT_ID, process.env.GUILD_ID, cmd.id)
      );
      console.log(`✅ Deleted guild command: ${cmd.name}`);
    }

    // Delete global commands one by one
    for (const cmd of globalCommands) {
      await rest.delete(Routes.applicationCommand(process.env.CLIENT_ID, cmd.id));
      console.log(`✅ Deleted global command: ${cmd.name}`);
    }

    console.log("✨ All commands deleted successfully.");
  } catch (err) {
    console.error("❌ Error while clearing commands:", err);
  }
})();