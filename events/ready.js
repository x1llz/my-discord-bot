export default {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`✅ Logged in as ${client.user.tag}`);

    // Fixe une activité permanente
    client.user.setActivity("discord.gg/hellz", {
      type: 0, // Playing
    });
  },
};