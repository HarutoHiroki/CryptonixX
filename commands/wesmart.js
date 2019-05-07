const Discord = require('discord.js');

exports.run =  (client, message, args) => {
  message.delete();
    message.channel.send('<a:wesmart:497789324792823835>')
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'wesmart',
    description: 'wesmart!',
    usage: 'wesmart'
  };