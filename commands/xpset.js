const Discord = require("discord.js");
const fs = require("fs");
//const mysql = require('mysql');
//const file = require('../mysql.json');
const settings = require('../settings.json')
const customisation = require('../customisation.json');
const mongoose = require('mongoose')

exports.run = async (client, message, args) => {
  const Xp = require('../models/xp.js')
  if(message.author.id !== settings.ownerid) return message.channel.send(`${message.author}, ${customisation.ownercmdfailtext}`);
  if(!args[1]) return message.channel.send("You need to specify an ammount");
  let user = message.mentions.users.first() || message.author
  Xp.findOne({
    userID: user.id,
    serverID: message.guild.id,
  }, (err, xp) => {
    if (err) console.error(err);
    if (!xp) {
        const newXp = new Xp({
            _id: mongoose.Types.ObjectId(),
            userID: user.id,
            serverID: message.guild.id,
            level: 1,
            xp: args[1],
        });
  
        newXp.save()
            //.then(result => console.log(result))
            .catch(err => console.error(err));
    }else{
        xp.xp = parseInt(args[1]);
        xp.save()
            //.then(result => console.log(result))
            .catch(err => console.error(err));
    }
    const embed = new Discord.RichEmbed()
    .setColor(Math.floor(Math.random()*16777215))
    .addField(`XP!`,`<@${user.id}>'s XP has been set to ${args[1]} XPs!`)
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
    name: 'xpset',
    description: 'Set a user\'s XP.',
    usage: 'xpset'
  };
  