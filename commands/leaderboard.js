const Discord = require('discord.js');
const mongoose = require('mongoose');
const xp = require('../models/xp.js');
const numbers = [':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:', ':keycap_ten:'];

exports.run = async (bot, message, args) => {
    const cursor = xp.find({ 'serverID': message.guild.id }).sort({ 'level': -1, 'xp': -1 }).collation({locale: "en_US", numericOrdering: true})
        const embed = new Discord.RichEmbed()
            .setColor('#DAA520')
            .setTitle('Top 10 XP Leaderboard')
            .setFooter('XP System', message.guild.iconURL);

        cursor.exec(async (err, result) => {
            if (err) {
                console.error(err);
                return message.channel.send('Sorry an error has occurred!');
            }

            let order = 0;
            for(let i = 0; i < 10; i++) {
                if(i > result.length - 1) {
                    break;
                }
                //console.log(result[i].userID)
                const user = await message.guild.members.get(`${result[i].userID}`).user
                if(message.guild.members.get(`${result[i].userID}`) === undefined) {
                    user = "user left guild"
                }

                if(user != undefined && !user.bot) {
                    embed.addField(`${numbers[order]} Username`, user.username, true)
                    .addField('Total XP', result[i].xp);
                    order++;
                }
            }

            message.channel.send(embed);
        });
    };

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
exports.help = {
    name: 'leaderboard',
    description: 'Send Leaderboard',
    usage: 'leaderboard'
  };