const Discord = require("discord.js");
const fs = require("fs");
const customisation = require('../customisation.json');
const settings = require('../settings.json')
const db = require('quick.db');

exports.run = async (bot, message, args, prefix) => {

  if(message.author.id !== settings.ownerid && !message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(`:facepalm: You can't do that BOIII! :facepalm:`);
  if(!args[0] || args[0] == "help") return message.reply(`Usage: [p]xpgain on|off|stats\n([p] is the current prefix)`);

  if(args[0] === 'off'){
        let stats = await db.fetch(`xpstatus_${message.guild.id}`)
        if(!stats || stats ==='off') return message.reply("XP gain for this server is already off");
        db.set(`xpstatus_${message.guild.id}`, 'off')
        message.channel.send("Success, XP gain for this server is now Off")
        console.log(await db.fetch(`xpstatus_${message.guild.id}`))
        return
    }else{
        if(args[0] === 'on'){
            let stats = await db.fetch(`xpstatus_${message.guild.id}`)
        if(stats ==='on') return message.reply("XP gain for this server is already on");
            db.set(`xpstatus_${message.guild.id}`, 'on')
            console.log(await db.fetch(`xpstatus_${message.guild.id}`))

            let embed = new Discord.RichEmbed()
            .setColor("#ff8200")
            .setTitle("XP System")
            .setDescription(`XP gain for this server is now turned On`)
            .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
            message.channel.send({embed});
  }else{
      if(args[0] === 'stats'){
        let stats = await db.fetch(`xpstatus_${message.guild.id}`)
        if(!stats || stats ==='off') return message.reply("XP gain for this server is OFF");
        if(stats ==='on') return message.reply("XP gain for this server is ON");
      
  }else{
      message.reply(`Usage: [p]xpgain on|off \n([p] is the current prefix)`)
  }
  }
}
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
exports.help = {
    name: 'xpgain',
    description: 'Changes the XP gain status for the server.',
    usage: 'xpgain <channel>'
  };
  