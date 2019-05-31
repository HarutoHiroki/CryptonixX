const Discord = require('discord.js');
const fs = require("fs");
const ms = require("ms");
const customisation = require('../customisation.json');

const mongoose = require('mongoose');

exports.run = async (client, message, args) => {
    mongoose.connect('mongodb://localhost/warnings');
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("❌**Error:** You don't have the **Kick Members** permission!");
    if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);
    if (message.mentions.users.first().id === message.author.id) return message.reply('I can\' let you do that, self-harm is bad:facepalm:');
    if (message.mentions.users.first().id === "242263403001937920") return message.reply("You can't warn my Developer:wink:");
    if (reason.length < 1) reason = 'No reason supplied.';
    

const Warn = require('../models/warn.js');
    Warn.getOne({
      userID: message.author.id,
      serverID: message.guild.id,
    }, (err, warn) => {
      if (err) console.error(err);
      if (!warn) {
    const newWarn = new Warn({
        _id: mongoose.Types.ObjectId(),
        serverID: message.guild.id,
        username: user.username,
        userID: user.id,
        reason: reason,
        wUsername: message.author.username,
        wID: message.author.id,
        time: message.createdAt
    });
    newWarn.save()
    .then(result => console.log(result))
    .catch(e => console.log(e))
    const embed = new Discord.RichEmbed()
    .setColor(0xFFFF00)
    .setTimestamp()
    .addField('Action:', 'Warning')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Warned by:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason)
    .addField('Time', message.createdAt)
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    let logchannel = message.guild.channels.get('name', 'logs');
    if  (!logchannel){
      message.channel.send({embed})
    }else{
      message.channel.send({embed})
      client.channels.get(logchannel.id).send({embed});
    }
    if(user.bot) return;
    message.mentions.users.first().send({embed}).catch(e =>{
      if(e) return 
    });
  }else{
    const newWarn = new Warn({
      _id: mongoose.Types.ObjectId(),
      serverID: message.guild.id,
      username: user.username,
      userID: user.id,
      reason: reason,
      wUsername: message.author.username,
      wID: message.author.id,
      time: message.createdAt
  });
    newWarn.save()
    .then(result => console.log(result))
    .catch(e => console.log(e))
    const embed = new Discord.RichEmbed()
    .setColor(0xFFFF00)
    .setTimestamp()
    .addField('Action:', 'Warning')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Warned by:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason)
    .addField('Time', message.createdAt)
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    let logchannel = message.guild.channels.get('name', 'logs');
    if  (!logchannel){
      message.channel.send({embed})
    }else{
      message.channel.send({embed})
      client.channels.get(logchannel.id).send({embed});
    }
    if(user.bot) return;
    message.mentions.users.first().send({embed}).catch(e =>{
      if(e) return 
    });
  }
});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tw"],
  permLevel: 5
};

exports.help = {
  name: 'testwarning',
  description: 'Issues a warning to the mentioned user.',
  usage: 'testwarning [mention] [reason]'
};
