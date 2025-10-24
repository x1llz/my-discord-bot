module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`✅ Logged in as ${client.user.tag}`);
    client.user.setPresence({
      activities: [{ name: "/help .gg/hellz", type: 0 }], // Playing
      status: "online",
    });
  },
};