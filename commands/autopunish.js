const Discord = require('discord.js');
const customisation = require('../customisation.json');

const mongoose = require('mongoose');

exports.run = async (client, message, args) => {
    let type = args[0]
    if(type !== 'ban' &&  type !== 'mute' && type !== 'stats') return message.reply('Usage: autopunish mute|ban on|off [number of mutes] \n autopunish stats')
    let status = args[1]
    if(type !== 'stats'){
        if(status !== 'off' && status !== 'on') return message.reply('Usage: autopunish mute|ban on|off [number of mutes] \n autopunish stats')
    }
    let amount = args[2]
    const punishstats = require('../models/punish.js')
    if(type === 'ban'){
        if(status === 'on'){
            if(!amount || parseInt(amount) === NaN) return message.reply("Please supply a valid amount of warns for the Punishment")
            const gpunish = punishstats.findOne({
                guildID: message.guild.id
            }, (err, punish) => {
                if(!punish){
                    const newPunish = new punishstats({
                        _id: mongoose.Types.ObjectId(),
                        guildID: message.guild.id,
                        mutestatus: "off",
                        mute: 3,
                        banstatus: 'on',
                        ban: parseInt(amount)                
                    });
                    newPunish.save()
                }else{
                    punish.banstatus = 'on'
                    punish.ban = parseInt(amount) 
                    punish.save()
                    const embed = new Discord.RichEmbed()
                    .setTitle("Auto Punish")
                    .setColor(0xFF0000)
                    .setTimestamp()
                    .addField("Stats: ", `Mute - ${punish.mutestatus} \nBan - ${punish.banstatus}`)
                    .addField("Mute: ", punish.mute + " warns")
                    .addField("Ban: ", punish.ban + " warns")
                    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
                    message.channel.send({embed})
                }
            })
        }else if(status === 'off'){
            const gpunish = punishstats.findOne({
                guildID: message.guild.id
            }, (err, punish) => {
                if(!punish){
                    const newPunish = new punishstats({
                        _id: mongoose.Types.ObjectId(),
                        guildID: message.guild.id,
                        mutestatus: "off",
                        mute: 3,
                        banstatus: 'off',
                        ban: 5                
                    });
                    newPunish.save()
                }else{
                    punish.banstatus = 'off'
                    punish.save()
                    const embed = new Discord.RichEmbed()
                    .setTitle("Auto Punish")
                    .setColor(0xFF0000)
                    .setTimestamp()
                    .addField("Stats: ", `Mute - ${punish.mutestatus} \nBan - ${punish.banstatus}`)
                    .addField("Mute: ", punish.mute + " warns")
                    .addField("Ban: ", punish.ban + " warns")
                    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
                    message.channel.send({embed})
                }
            })
        }
    }
    if(type === 'mute'){
        if(status === 'on'){
            if(!amount || parseInt(amount) === NaN) return message.reply("Please supply a valid amount of Warns for the Punishment")
            const gpunish = punishstats.findOne({
                guildID: message.guild.id,
            }, (err, punish) => {
                if(!punish){
                    const newPunish = new punishstats({
                        _id: mongoose.Types.ObjectId(),
                        guildID: message.guild.id,
                        mutestatus: "on",
                        mute: amount,
                        banstatus: 'off',
                        ban: 5                
                    });
                    newPunish.save()
                    const embed = new Discord.RichEmbed()
                    .setTitle("Auto Punish")
                    .setColor(0xFF0000)
                    .setTimestamp()
                    .addField("Stats: ", `Mute - ${newPunish.mutestatus} \nBan - ${newPunish.banstatus}`)
                    .addField("Mute: ", newPunish.mute + " warns")
                    .addField("Ban: ", newPunish.ban + " warns")
                    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
                    message.channel.send({embed})
                }else{
                    punish.mutestatus = 'on'
                    punish.mute = parseInt(amount) 
                    punish.save()
                    const embed = new Discord.RichEmbed()
                    .setTitle("Auto Punish")
                    .setColor(0xFF0000)
                    .setTimestamp()
                    .addField("Stats: ", `Mute - ${punish.mutestatus} \nBan - ${punish.banstatus}`)
                    .addField("Mute: ", punish.mute + " warns")
                    .addField("Ban: ", punish.ban + " warns")
                    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
                    message.channel.send({embed})
                }
            })
        }else if(status === 'off'){
            const gpunish = punishstats.findOne({
                guildID: message.guild.id
            }, (err, punish) => {
                if(!punish){
                    const newPunish = new punishstats({
                        _id: mongoose.Types.ObjectId(),
                        guildID: message.guild.id,
                        mutestatus: "off",
                        mute: 3,
                        banstatus: 'off',
                        ban: 5                
                    });
                    newPunish.save()
                    const embed = new Discord.RichEmbed()
                    .setTitle("Auto Punish")
                    .setColor(0xFF0000)
                    .setTimestamp()
                    .addField("Stats: ", `Mute - ${newPunish.mutestatus} \n Ban - ${newPunish.banstatus}`)
                    .addField("Mute: ", newPunish.mute + " warns")
                    .addField("Ban: ", newPunish.ban + " warns")
                    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
                    message.channel.send({embed})
                }else{
                    punish.mutestatus = 'off'
                    punish.save()
                    const embed = new Discord.RichEmbed()
                    .setTitle("Auto Punish")
                    .setColor(0xFF0000)
                    .setTimestamp()
                    .addField("Stats: ", `Mute - ${punish.mutestatus} \n Ban - ${punish.banstatus}`)
                    .addField("Mute: ", punish.mute + " warns")
                    .addField("Ban: ", punish.ban + " warns")
                    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
                    message.channel.send({embed})
                }
            })
        }
    }
    if(type === 'stats'){
        const gpunish = punishstats.findOne({
            guildID: message.guild.id
        }, (err, punish) => {
            if(!punish){
                const newPunish = new punishstats({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    mutestatus: "off",
                    mute: 3,
                    banstatus: 'off',
                    ban: 5                
                });
                newPunish.save()
                const embed = new Discord.RichEmbed()
                .setTitle("Auto Punish")
                .setColor(0xFF0000)
                .setTimestamp()
                .addField("Stats: ", `Mute - ${newPunish.mutestatus} \n Ban - ${newPunish.banstatus}`)
                .addField("Mute: ", newPunish.mute + " warns")
                .addField("Ban: ", newPunish.ban + " warns")
                .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
                message.channel.send({embed})
            }else{
                const embed = new Discord.RichEmbed()
                .setTitle("Auto Punish")
                .setColor(0xFF0000)
                .setTimestamp()
                .addField("Stats: ", `Mute - ${punish.mutestatus} \n Ban - ${punish.banstatus}`)
                .addField("Mute: ", punish.mute + " warns")
                .addField("Ban: ", punish.ban + " warns")
                .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
                message.channel.send({embed})
            }
        })
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
exports.help = {
    name: 'autopunish',
    description: 'Issues a autopunishing to the mentioned user.',
    usage: 'autopunish mute|ban on|off [number of warns]'
};