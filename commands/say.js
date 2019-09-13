exports.run = async (client, message) => {
    const Discord = require('discord.js')
    let args = message.content.split(" ").slice(1);
    if (args.join(" ") === "@everyone" || args.join(" ") === "@here") return message.channel.send("You ain't making me Ping anyone BOI!");
    if(message.attachments){
        message.delete();
        const newAtc = await new Discord.Attachment(message.attachments.first().url)
        message.channel.send(args.join(" ") + newAtc)
    }else{
        message.delete();
        message.channel.send(args.join(" "));
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "say",
    description: "Makes the bot repeat your message.",
    usage: "say [message]"
};
