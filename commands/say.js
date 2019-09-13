exports.run = async (client, message) => {
    const Discord = require('discord.js')
    let args = message.content.split(" ").slice(1);
    if (args.join(" ") === "@everyone" || args.join(" ") === "@here") return message.channel.send("You ain't making me Ping anyone BOI!");
    await message.delete();
    if(message.attachments.first()){
        message.channel.send(`${args.join(" ")}`, {file: message.attachments.first().url})
    }else{
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
