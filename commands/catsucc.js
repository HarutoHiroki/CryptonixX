const Discord = require('discord.js');

exports.run =  (client, message, args) => {
  message.delete();
    message.channel.send('<a:catsucc:556500357241503745>')
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'catsucc',
    description: 'Perfectly normal cat sucking milk, not lewd at all :)',
    
    usage: 'catsucc'
  };