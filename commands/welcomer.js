const Discord = require("discord.js");
const fs = require("fs");
const customisation = require('../customisation.json');
const db = require('quick.db');

exports.run = async (client, message, args, prefix) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`:facepalm: You can't do that BOIII! :facepalm:`);
  if(args[0] === 'clear'){
    await db.set(`welcomer_${message.guild.id}`, 'none')
    await db.set(`welcomerid_${message.guild.id}`, 'none')
        message.channel.send("Success, Cleared customised welcome message.")
        return
    }else{
        let input = args.join(' ').split('|')
        if(parseInt(input[1]) == NaN) return message.reply('Usage: welcomer `<message>|<channel id>` (no spaces around the "|")')
        //console.log(input[1])
        if(client.channels.get(input[1]) === undefined) return message.reply('Usage: welcomer `<message>|<channel id>` (no spaces around the "|")')
        let string = input[0]
        //console.log(input[0])
        await db.set(`welcomer_${message.guild.id}`, string)
        await db.set(`welcomerid_${message.guild.id}`, input[1])
        

        let embed = new Discord.RichEmbed()
        .setColor("#ff8200")
        .setTitle("Welcome Message Changed")
        .setDescription(`Set to ${string}`)
        .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);

        message.channel.send({embed});
    } 
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
exports.help = {
    name: 'welcomer',
    description: 'Changes the welcome message for the server.',
    usage: 'welcomer <message>|<channel id> (no spaces around the "|")'
  };
  