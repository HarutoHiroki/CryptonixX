const Discord = require('discord.js');

exports.run =  (client, message, args) => {
    message.delete();
    message.channel.send('<a:orangejustice:497742636883378177>')
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["orangejustice"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'oj',
    description: 'orange justice!',
    usage: 'oj'
  };