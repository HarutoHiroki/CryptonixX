const db = require('quick.db');

exports.run = (client, message, args, func) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`:facepalm: You can't do that BOIII! :facepalm:`);
    if(!args.join(" ") || args[0] == "help") return message.reply(`Usage: [p]autoroleset roleID ([p] is the bot's prefix, only 1 role compatible for now)\n[p]autoroleset clear (to clear the autorole list)`);

    if(args[0] === 'clear'){
        db.set(`autoRole_${message.guild.id}`, 'none').then(i =>{
            message.channel.send("Success, Cleared Auto-Role list")
        })
    }else{
        if(!message.guild.roles.get(args.join(" "))) return message.channel.send(`${args.join(" ")} is not a valid role!`)
        db.set(`autorole_${message.guild.id}`, args.join(' '))
        message.channel.send(`Role updated!`)
    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'autoroleset',
    description: 'Setup Auto-Role for a server',
    usage: 'autoroleset'
  };