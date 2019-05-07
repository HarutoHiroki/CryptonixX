const Discord = require('discord.js');

exports.run =  (client, message, args) => {
    message.delete();
    message.channel.send('<a:confuseddoggo:498045545911156736>')
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["cdog"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'confuseddoggo',
    description: 'Cute confused Doggo!',
    usage: 'confuseddoggo'
  };