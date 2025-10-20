import fs from "fs";
import path from "path";

/**
 * Charge automatiquement toutes les commandes d'un dossier et de ses sous-dossiers.
 * Compatible avec import/export (V2).
 */
export async function loadCommands(client, dir = "./commands") {
  const __dirname = path.resolve();
  const folderPath = path.join(__dirname, dir);

  if (!fs.existsSync(folderPath)) {
    console.warn(`⚠️ Commands folder not found: ${folderPath}`);
    return;
  }

  let commandCount = 0;

  const loadDir = async (directory) => {
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const fullPath = path.join(directory, file);

      if (fs.lstatSync(fullPath).isDirectory()) {
        await loadDir(fullPath); // Charge récursivement
      } else if (file.endsWith(".js")) {
        try {
          // Import dynamique du module ES
          const { default: command } = await import(`file://${fullPath}`);

          if (command?.name && typeof command.execute === "function") {
            client.commands.set(command.name.toLowerCase(), command);
            commandCount++;
          } else {
            console.warn(`⚠️ Invalid command structure in ${file}`);
          }
        } catch (err) {
          console.error(`❌ Error loading command ${file}:`, err);
        }
      }
    }
  };

  await loadDir(folderPath);
  console.log(`✅ Loaded ${commandCount} commands successfully.`);
}