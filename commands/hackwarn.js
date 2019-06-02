const Discord = require('discord.js');
const fs = require("fs");
const ms = require("ms");
const customisation = require('../customisation.json');

const mongoose = require('mongoose');

exports.run = async (client, message, args) => {
    mongoose.connect('mongodb://localhost/DiscordDB', { useNewUrlParser: true });
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("❌**Error:** You don't have the **Kick Members** permission!");
    if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);
    if (message.mentions.users.first().id === message.author.id) return message.reply('I can\' let you do that, self-harm is bad:facepalm:');
    if (message.mentions.users.first().id === "242263403001937920") return message.reply("You can't warn my Developer:wink:");
    if (reason.length < 1) reason = 'No reason supplied.';
    
    function makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
  
const Warn = require('../models/warn.js');
    Warn.findOne({
      userID: message.author.id,
      serverID: message.guild.id,
    }, (err, warn) => {
      if (err) console.error(err);
      if (!warn) {
    const newWarn = new Warn({
        _id: mongoose.Types.ObjectId(),
        serverID: message.guild.id,
        username: user.username,
        userID: args[0],
        reason: reason,
        wUsername: message.author.username,
        wID: message.author.id,
        warnid: makeid(7),
        time: message.createdAt
    });
    newWarn.save()
    .catch(e => console.log(e))
    const embed = new Discord.RichEmbed()
    .setColor(0xFFFF00)
    .setTimestamp()
    .addField('Action:', 'Warning')
    .addField('User:', `${client.users.get(`${args[0]}`).username}#${client.users.get(`${args[0]}`).discriminator}`)
    .addField('Warned by:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason)
    .addField('Warn ID:', newWarn.warnid)
    .addField('Time', message.createdAt)
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    let logchannel = message.guild.channels.find('name', 'logs');
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
      userID: args[0],
      reason: reason,
      wUsername: message.author.username,
      wID: message.author.id,
      warnid: makeid(7),
      time: message.createdAt
  });
    newWarn.save()
    .catch(e => console.log(e))
    const embed = new Discord.RichEmbed()
    .setColor(0xFFFF00)
    .setTimestamp()
    .addField('Action:', 'Warning')
    .addField('User:', `${client.users.get(`${args[0]}`).username}#${client.users.get(`${args[0]}`).discriminator}`)
    .addField('Warned by:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason)
    .addField('Warn ID:', newWarn.warnid)
    .addField('Time', message.createdAt)
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    let logchannel = message.guild.channels.find('name', 'logs');
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
  aliases: [],
  permLevel: 5
};

exports.help = {
  name: 'hackwarn',
  description: 'Issues a warning to the mentioned user.',
  usage: 'hackwarn [UserID] [reason]'
};