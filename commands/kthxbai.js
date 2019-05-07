const Discord = require('discord.js');

exports.run =  (client, message, args) => {
  message.delete();
    message.channel.send('<a:kthnxbai:497742799827894292>')
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ktb"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'kthxbai',
    description: 'kthxbai!',
    usage: 'kthxbai'
  };