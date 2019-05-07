const Discord = require('discord.js');

exports.run =  (client, message, args) => {
  message.delete();
    message.channel.send('<a:angryping:497781636017160192>')
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ap"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'angryping',
    description: 'PING!',
    usage: 'angryping'
  };