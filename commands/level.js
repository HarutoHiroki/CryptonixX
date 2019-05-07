const Discord = require("discord.js");
const fs = require("fs");
const customisation = require('../customisation.json');
const settings = require('../settings.json')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  let stats = await db.fetch(`xpstatus_${message.guild.id}`)
  if(!stats || stats ==='off') return message.reply("XP gain for this server is OFF");
  const Xp = require('../models/xp.js')
  let user = message.author || message.mentions.users.first();
  Xp.findOne({
    userID: user.id,
    serverID: message.guild.id,
  }, (err, xp) => {
    if (err) console.error(err);
    if (!xp) {
      return message.channel.send("This user has no XP on record.")
    }else{
    
    let curxp = xp.xp;
    
    let curlvl = xp.level;
    let nxtLvl = xp.level * 1000 + 1000;
    let difference = nxtLvl - curxp;
    
    let embed = new Discord.RichEmbed()
    .setTitle(`${user.username} Stats:`)
    .setColor(Math.floor(Math.random()*16777215))
    .addField(`Level:`,curlvl, true)
    .addField('XP:',curxp, true)
    .addField("XP till level up:", difference)
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    message.channel.send({embed}).then(message => {message.delete(10000)});
    }
  })
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["xp"],
    permLevel: 0
  };
  
exports.help = {
    name: 'level',
    description: 'Check a user\'s xp level.',
    usage: 'level'
  };
  