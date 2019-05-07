const Discord = require('discord.js');

exports.run =  (client, message, args) => {
  message.delete();
    message.channel.send("<a:derpbongo:557829559211261963>")
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'dbongo',
    description: 'Derpy Bongo Cat',
    usage: 'dbongo'
  };