const Discord = require('discord.js')
const customisation = require('../customisation.json');

exports.run = (client, message) => {
    serverlist = ''
    client.guilds.forEach((guild) => {
        serverlist = serverlist.concat(" - " + guild.name + ": ID: " + guild.id + "\n")
    })

  const embed = new Discord.RichEmbed()
  .setColor(Math.floor(Math.random()*16777215))
  .setTitle("Servers that have Cryptonix X", '')
  .setDescription(serverlist)
  .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);

  message.channel.send({embed});
    }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'serverlist',
  description: 'List servers that the bot is in',
  usage: 'serverlist'
};

