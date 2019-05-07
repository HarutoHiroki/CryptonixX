const Discord = require('discord.js');

exports.run =  (client, message, args) => {
  message.delete();
    message.channel.send('<a:pissedoffping:509215686128828437>')
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ap"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'pissedoffping',
    description: 'PING!',
    usage: 'pissedoffping'
  };