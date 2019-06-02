const Discord = require("discord.js");
const fs = require("fs");
//const mysql = require('mysql');
//const file = require('../mysql.json');
const settings = require('../settings.json')
const customisation = require('../customisation.json');
const mongoose = require('mongoose');

exports.run = async (client, message, args) => {
  const Coins = require('../models/coins.js');
  let user = message.mentions.users.first()
  if(message.author.id !== settings.ownerid) return message.channel.send(`${message.author}, ${customisation.ownercmdfailtext}`);
  if(!args[1]) return message.channel.send("You need to specify an ammount");

  Coins.findOne({
    userID: user.id
  }, (err, coins) => {
    if (err) console.error(err);
    if (!coins) {
        const newCoins = new Coins({
            _id: mongoose.Types.ObjectId(),
            userID:user.id,
            coins: args[1],
        });
  
        newCoins.save()
            //.then(result => console.log(result))
            .catch(err => console.error(err));
    }else{
        coins.coins = parseInt(args[1]);
        coins.save()
            //.then(result => console.log(result))
            .catch(err => console.error(err));
    }
  

    const embed = new Discord.RichEmbed()
    .setColor(Math.floor(Math.random()*16777215))
    .addField(`COINSSS!`,`${user.username} coins has been set to ${args[1]} coins!`)
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    
    message.channel.send({embed})/*.then(message => {message.delete(10000)})*/;
  });
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
exports.help = {
    name: 'coinsset',
    description: 'Set a user\'s coins.',
    usage: 'coinsset'
  };
  