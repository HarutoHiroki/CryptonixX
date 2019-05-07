const Discord = require("discord.js");
const ffmpeg = require("ffmpeg-binaries");
const opusscript = require("opusscript");
const customisation = require('../customisation.json');

exports.run = (client, message, args) => {
      if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => {
            let embed = new Discord.RichEmbed()
            .setDescription('**Connected!** Playing listen.moe KPOP.')
            .setColor('#ff9900')
            .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
            connection.playArbitraryInput(`https://listen.moe/kpop/opus`);
            message.channel.send(embed);
          })
          .catch(console.log);
      } else {
        message.reply('You are not in a voice channel!');
      }
    };
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
    };
     
exports.help = {
  name: 'kpop',
  description: 'Play listen.moe radio (K-Pop channel)',
  usage: 'kpop'
};