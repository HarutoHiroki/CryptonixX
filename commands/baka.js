const Discord = require('discord.js');
const superagent = require('superagent');
const customisation = require('../customisation.json');

exports.run = async (client, message, args, tools) => {
    if (!message.mentions.users.first()) return message.reply("You need to mention someone...");
    if(message.mentions.users.first().id === "242263403001937920") return message.reply('My Dev is not baka you b..BAKA >.>');
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/baka");
    
    const embed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle(`${message.mentions.users.first().username} YOU B..BAKAAAA!`)
    .setImage(body.url) 
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    message.channel.send({embed})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'baka',
    description: 'B..BAKAAA!',
    usage: 'baka'
  };