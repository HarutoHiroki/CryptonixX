const Discord = require('discord.js');

exports.run =  (client, message, args) => {
  message.delete();
    message.channel.send('<a:CrabRave:555753213798776853>')
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'crabrave',
    description: 'Crab Rave Meme!',
    usage: 'crabrave'
  };