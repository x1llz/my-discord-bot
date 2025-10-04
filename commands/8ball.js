module.exports = {
    name: '8ball',
    description: 'Ask the magic 8-ball a question',
    execute(message, args) {
        if (args.length === 0) return message.reply("🎱 Ask a full question!");
        const responses = [
            "Yes.",
            "No.",
            "Maybe.",
            "Definitely!",
            "I don’t think so.",
            "Ask again later.",
            "Absolutely not.",
            "Without a doubt.",
        ];
        const response = responses[Math.floor(Math.random() * responses.length)];
        message.reply(`🎱 ${response}`);
    },
};
