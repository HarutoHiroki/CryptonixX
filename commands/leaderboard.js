const Discord = require('discord.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DiscordDB', { useNewUrlParser: true }, err => {
    if (err) console.error(err);
    //console.log(mongoose);
});
const xp = require('../models/xp.js');
const numbers = [':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:', ':keycap_ten:'];



exports.run = async (bot, message, args) => {
    const cursor = xp.find({ 'serverID': message.guild.id }).sort({ 'xp': -1 });
        const embed = new Discord.RichEmbed()
            .setColor('#DAA520')
            .setTitle('Top 10 XP Leaderboard')
            .setFooter('XP System', message.guild.iconURL);

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
                const user = message.guild.members.get(result[i].userID).user;

                if(!user.bot) {
                    embed.addField(`${numbers[order]} Username`, user.username, true)
                    .addField('Total XP', result[i].xp, true);
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