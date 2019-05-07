const Discord = require("discord.js");
const fs = require("fs");
const customisation = require('../customisation.json');
const settings = require('../settings.json')
const db = require('quick.db');

exports.run = async (bot, message, args, prefix) => {

  if(message.author.id !== settings.ownerid && !message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(`:facepalm: You can't do that BOIII! :facepalm:`);
  if(!args[0] || args[0] == "help") return message.reply(`Usage: [p]channelignore on|off <channelname> \n([p] is the current prefix)`);

  if(args[0] === 'off'){
        let name = message.content.split(" ").splice(2).join(" ");
        let id = message.guild.channels.find('name', name).id
        if(!id) message.reply("Please provide a valid channel name without #")
        let stats = await db.fetch(`channelignore_${message.guild.id}_${id}`)
        if(!stats || stats ==='off') return message.reply("This channel isn't ignored");
        db.set(`channelignore_${message.guild.id}_${id}`, 'off')
        message.channel.send("Success, Unignored")
        console.log(await db.fetch(`channelignore_${message.guild.id}_${id}`))
        return
    }else{
        if(args[0] === 'on'){
            let name = message.content.split(" ").splice(2).join(" ");
            let id = message.guild.channels.find('name', name).id
            if (!id) return message.reply("Please provide a valid channel name without #")
            let stats = await db.fetch(`channelignore_${message.guild.id}_${id}`)
        if(stats ==='on') return message.reply("This channel has already been ignored");
            db.set(`channelignore_${message.guild.id}_${id}`, 'on')
            console.log(await db.fetch(`channelignore_${message.guild.id}_${id}`))

            let embed = new Discord.RichEmbed()
            .setColor("#ff8200")
            .setTitle("Channel Ignored")
            .setDescription(`To unlock the channel, go to another channel and type /channelignore off <channel id>`)
            .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
            message.channel.send({embed});
  }else{
      message.reply(`Usage: [p]channelignore on|off <channelname> \n([p] is the current prefix)`)
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
    name: 'channelignore',
    description: 'Changes the ignore channel for the server.',
    usage: 'channelignore <channel>'
  };
  