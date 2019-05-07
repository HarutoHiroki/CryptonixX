const Discord = require('discord.js');

exports.run =  (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor(Math.floor(Math.random()*16777215))
    .setTimestamp()
    .setImage('https://media.giphy.com/media/vk7VesvyZEwuI/giphy.gif')
    .setFooter('© Cryptonix X Mod Bot by That1WeebDood');
    message.channel.send({embed})
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'triggered',
    description: 'triggered!',
    usage: 'triggered'
  };