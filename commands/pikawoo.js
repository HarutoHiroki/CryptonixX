const Discord = require('discord.js');

exports.run =  (client, message, args) => {
  message.delete();
    message.channel.send('<a:pikawoo:556017647049768960>')
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'pikawoo',
    description: 'Pika Pika Pikachuuuuu!',
    usage: 'pikawoo'
  };