const fs = require("fs");
const path = require("path");

const vanityFile = path.join(__dirname, "../../data/vanity.json");
if (!fs.existsSync(vanityFile)) fs.writeFileSync(vanityFile, JSON.stringify({}, null, 2));

module.exports = {
  name: "presenceUpdate",

  async execute(oldPresence, newPresence, client) {
    if (!newPresence || !newPresence.guild) return;

    const guild = newPresence.guild;
    const member = newPresence.member;
    if (!member || member.user.bot) return;

    const data = JSON.parse(fs.readFileSync(vanityFile));
    const config = data[guild.id];
    if (!config) return;

    const keyword = config.keyword?.toLowerCase();
    const role = guild.roles.cache.get(config.roleId);
    const channel = guild.channels.cache.get(config.channelId);
    if (!keyword || !role || !channel) return;

    const oldStatus =
      oldPresence?.activities.find(a => a.type === 4)?.state?.toLowerCase() || "";
    const newStatus =
      newPresence?.activities.find(a => a.type === 4)?.state?.toLowerCase() || "";

    // user added vanity keyword
    if (newStatus.includes(keyword) && !oldStatus.includes(keyword)) {
      if (!member.roles.cache.has(role.id)) {
        await member.roles.add(role).catch(() => {});
        const msg = config.message
          .replace("{user.mention}", `<@${member.id}>`)
          .replace("{role.name}", role.name)
          .replace("{keyword}", keyword);
        await channel.send(msg).catch(() => {});
      }
    }

    // user removed vanity keyword
    if (!newStatus.includes(keyword) && oldStatus.includes(keyword)) {
      if (member.roles.cache.has(role.id)) {
        await member.roles.remove(role).catch(() => {});
      }
    }
  },
};
