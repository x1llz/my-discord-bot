const Discord = require('discord.js');

module.exports = {
    name: 'dadjoke',
    description: 'Get a random dad joke',
    execute(message, args) {
        const jokes = [
            "Why don't skeletons fight each other? They don’t have the guts.",
            "I used to play piano by ear, but now I use my hands.",
            "What do you call fake spaghetti? An impasta.",
            "Did you hear about the guy who invented Lifesavers? He made a mint!",
            "I only know 25 letters of the alphabet. I don’t know y.",
            "What do you call cheese that isn’t yours? Nacho cheese!",
            "Why can’t your nose be 12 inches long? Because then it would be a foot.",
            "I told my wife she should embrace her mistakes. She gave me a hug.",
            "I’m reading a book about anti-gravity. It’s impossible to put down.",
            "What did one wall say to the other? I’ll meet you at the corner.",
            "Why did the scarecrow win an award? Because he was outstanding in his field.",
            "Why don’t oysters donate to charity? Because they’re shellfish.",
            "I used to be addicted to soap, but I’m clean now.",
            "Did you hear about the claustrophobic astronaut? He needed a little space.",
            "How do cows stay up to date with current events? They read the moos-paper.",
            "I ordered a chicken and an egg from Amazon. I’ll let you know which comes first.",
            "Why did the coffee file a police report? It got mugged.",
            "Why do bees have sticky hair? Because they use honeycombs.",
            "What did the buffalo say to his son when he left for college? Bison.",
            "What kind of shoes do ninjas wear? Sneakers.",
            "How do you organize a space party? You planet.",
            "Why was the math book sad? It had too many problems.",
            "What did the ocean say to the beach? Nothing, it just waved.",
            "I used to be a baker, but I couldn’t make enough dough.",
            "Why did the bicycle fall over? Because it was two-tired.",
            "Parallel lines have so much in common. It’s a shame they’ll never meet.",
            "Why can’t you give Elsa a balloon? Because she’ll let it go.",
            "I don’t trust stairs because they’re always up to something.",
            "Did you hear about the kidnapping at the park? Miraculously, he woke up.",
            "I asked the librarian if the library had books on paranoia. She whispered, 'They’re right behind you.'",
            "Why don’t scientists trust atoms? Because they make up everything!",
            "Why was the computer cold? It left its Windows open.",
            "I told my computer I needed a break, and now it won’t stop sending me KitKat ads.",
            "What do you call an elephant that doesn’t matter? An irrelephant.",
            "Why did the golfer bring two pairs of pants? In case he got a hole in one.",
            "Did you hear about the restaurant on the moon? Great food, no atmosphere.",
            "What’s orange and sounds like a parrot? A carrot.",
            "How does Moses make his coffee? Hebrews it.",
            "Why did the tomato turn red? Because it saw the salad dressing.",
            "How do you make a tissue dance? You put a little boogie in it.",
            "Why did the cookie go to the hospital? Because it felt crummy.",
            "I told my wife she was drawing her eyebrows too high. She looked surprised.",
            "I’m on a whiskey diet. I’ve lost three days already.",
            "What do you call a fish wearing a bowtie? Sofishticated.",
            "I don’t play soccer because I enjoy the sport. I’m just doing it for kicks.",
            "I wanted to learn how to drive a stick shift, but I couldn’t find a manual.",
            "Why did the man fall into the well? Because he couldn’t see that well.",
            "What’s brown and sticky? A stick.",
            "If a child refuses to sleep during nap time, are they guilty of resisting a rest?",
            "What’s Forrest Gump’s password? 1forrest1.",
            "Why did the belt get arrested? For holding up a pair of pants."
        ];

        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

        const embed = new Discord.EmbedBuilder()
            .setColor("#ffcc00")
            .setTitle("😂 Dad Joke Time!")
            .setDescription(randomJoke)
            .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};
