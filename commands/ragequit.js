const Discord = require('discord.js');

exports.run =  (client, message, args) => {
  message.delete();
    message.channel.send('<a:ragequit:497789324939624458>')
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'ragequit',
    description: 'I QUIT!',
    usage: 'ragequit'
  };