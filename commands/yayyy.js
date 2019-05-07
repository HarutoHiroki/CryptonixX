const Discord = require('discord.js');

exports.run =  (client, message, args) => {
    message.delete();
    message.channel.send('<a:yayyy:497742636439044096>')
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'yayyy',
    description: 'Yayyy!',
    usage: 'yayyy'
  };