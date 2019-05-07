const Discord = require('discord.js');
const rules = require('../data/rules.json');
const settings = require('../settings.json');
const customisation = require('../customisation.json');
exports.run = (client, message) => {
    const embed = new Discord.RichEmbed()
    .setColor(0xFF0020)
    .setTimestamp()
    .setTitle("RULES: Read them, avoid being muted/kicked/banned")
    .addField('Rule 1', rules.rules1, true)
    .addField('Rule 2', rules.rules2, true)
    .addField('Rule 3', rules.rules3, true)
    .addField('Rule 4', rules.rules4, true)
    .addField('Rule 5', rules.rules5, true)
    .addField('Rule 6', rules.rules6, true)
    .addField('Rule 7', rules.rules7, true)
    .addField('Rule 8', rules.rules8, true)
    .addField('Rule 9', rules.rules9, true)
    .addField('Rule 10', rules.rules10, true)
    .addField('Rule 11', rules.rules11, true)
    .addField('Rule 12', rules.rules12, true)
    .addField('Rule 13', rules.rules13, true)
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    return message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 5
};

exports.help = {
  name: 'rules',
  description: 'Server Rules',
  usage: 'rules'
};
