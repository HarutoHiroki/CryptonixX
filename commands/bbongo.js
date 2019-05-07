const Discord = require('discord.js');

exports.run =  (client, message, args) => {
  message.delete();
    message.channel.send('<a:balancebongo:556017646081015810>')
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'bbongo',
    description: 'Balanced Bongo Cat',
    usage: 'bbongo'
  };