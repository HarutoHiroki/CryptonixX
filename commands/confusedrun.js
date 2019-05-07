const Discord = require('discord.js');

exports.run =  (client, message, args) => {
  message.delete();
    message.channel.send('<a:run1:497745362921193482><a:run2:497745362933776414><a:run3:497745363537494036><a:run4:497745362681987072>')
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["cr"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'confusedrun',
    description: 'confused anime girl run!',
    usage: 'confusedrun'
  };