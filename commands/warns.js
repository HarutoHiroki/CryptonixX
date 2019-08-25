const Discord = require('discord.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DiscordDB', { useNewUrlParser: true }, err => {
    if (err) console.error(err);
});
const warns = require('../models/warn.js');
const numbers = [':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:', ':keycap_ten:'];

exports.run = async (bot, message, args) => {
    let user
    if(!message.mentions.users.first().id){
        user = message.author.id
    }else{
        user = message.mentions.users.first().id
    }
    warns.findOne({
        userID: user,
        serverID: message.guild.id
    }, (err, warn) => {
        if (err) console.error(err);
        if (!warn) {
            return message.channel.send(`This user doesn\'t have any warnings:wink:`)
        }
    })
    const cursor = warns.find({ 
        userID: message.mentions.users.first().id,
        serverID: message.guild.id,
    }).sort({ time: +1 });
    cursor.exec((err, result) => {
        if (err) {
            console.error(err);
            return message.channel.send('Sorry an error has occurred!');
        }   
            let order = 0;
            for(let i = 0; i < 10; i++) {
                if(i > result.length - 1) {
                    break;
                }
                message.channel.send(numbers[order] + " - Reason: " + result[i].reason + " - ID: " + result[i].warnid + "\n")
                    order++;
            }
        });
    };

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  exports.help = {
    name: 'warns',
    description: 'Issues warns of the mentioned user.',
    usage: 'warns [mention]'
  };