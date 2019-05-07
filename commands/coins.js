const Discord = require("discord.js");
const customisation = require('../customisation.json');
const mongoose = require('mongoose');

exports.run = async (client, message, args) => {
  const Coins = require('../models/coins.js');
  let user = message.author.id || message.mentions.users.first().id
Coins.findOne({
  userID: user,
  serverID: message.guild.id,
}, (err, coins) => {
  if (err) console.error(err);
  if (!coins) {
    return message.channel.send("This user has no coins on record.")
  }else{
    const embed = new Discord.RichEmbed()
    .setColor(Math.floor(Math.random()*16777215))
    .addField(`COINSSS!`,`You have ${coins.coins} coins!`)
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    
    message.channel.send({embed}).then(message => {message.delete(10000)});
  }
})
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
exports.help = {
    name: 'coins',
    description: 'Check a user\'s coins.',
    usage: 'coins'
  };
  