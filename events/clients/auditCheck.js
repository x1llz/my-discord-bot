// events/guild/auditCheck.js
const fs = require("fs");
const path = require("path");

const antiFile = path.join(__dirname, "../../data/antinuke.json");
const adminsFile = path.join(__dirname, "../../data/admins.json");
const whitelistFile = path.join(__dirname, "../../data/antinuke_whitelist.json");
const logFile = path.join(__dirname, "../../data/antinuke_logs.json");

for (const file of [antiFile, adminsFile, whitelistFile, logFile]) {
  if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify(file.endsWith("admins.json") ? [] : {}));
}

const recentActions = new Map();

module.exports = {
  name: "guildAuditLogEntryCreate",

  async execute(entry, guild, client) {
    if (!guild || !entry?.executor) return;

    const executor = entry.executor;
    const botOwner = "1187100546683899995"; // your ID
    const ownerId = guild.ownerId;

    const antiData = JSON.parse(fs.readFileSync(antiFile));
    const admins = JSON.parse(fs.readFileSync(adminsFile));
    const whitelistData = JSON.parse(fs.readFileSync(whitelistFile));
    const logData = JSON.parse(fs.readFileSync(logFile));

    const config = antiData[guild.id];
    if (!config?.enabled) return;

    const whitelist = whitelistData[guild.id] || [];
    if ([botOwner, ownerId, ...admins, ...whitelist].includes(executor.id)) return;

    const key = `${guild.id}_${executor.id}`;
    const now = Date.now();
    const history = recentActions.get(key) || [];
    const filtered = history.filter(t => now - t < 10_000);
    filtered.push(now);
    recentActions.set(key, filtered);

    const dangerous = [
      "MEMBER_BAN_ADD",
      "CHANNEL_DELETE",
      "CHANNEL_CREATE",
      "ROLE_DELETE",
      "ROLE_CREATE",
    ];
    if (!dangerous.includes(entry.action)) return;

    if (filtered.length >= 3) {
      try {
        await guild.members.ban(executor.id, { reason: "Anti-Nuke: suspicious activity" });

        const logChannel =
          (logData[guild.id] && guild.channels.cache.get(logData[guild.id])) ||
          guild.systemChannel ||
          guild.channels.cache.find(
            c =>
              c.isTextBased() &&
              c.permissionsFor(guild.members.me).has("SendMessages")
          );

        if (logChannel) {
          logChannel.send({
            content: `🚨 **${executor.tag}** was **banned** for suspicious activity.\n> Multiple dangerous actions detected within 10s.`,
          });
        }
      } catch (err) {
        console.error(`❌ Failed to ban ${executor.tag}:`, err.message);
      } finally {
        recentActions.delete(key);
      }
    }
  },
};
