const Discord = require('discord.js');

exports.run =  (client, message, args) => {
  message.delete();
  message.channel.send("<a:rainbowThink:498039298562719745>")
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["rt"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'rainbowthink',
    description: 'Rainbow thinking emoji.',
    usage: 'rainbowthink'
  }