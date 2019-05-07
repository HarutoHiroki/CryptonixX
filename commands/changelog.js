const Discord = require('discord.js');
const changelog = require('../data/changelog.json');
const settings = require('../settings.json');
const customisation = require('../customisation.json');

exports.run = (client, message) => {
    const embed = new Discord.RichEmbed()
    .setColor(0xFF0020)
    .setTimestamp()
    .setTitle("The Bot's Changelog:")
    .addField('Changes:', changelog.changelog, true)
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    return message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'changelog',
  description: 'Server changelog',
  usage: 'changelog'
};
