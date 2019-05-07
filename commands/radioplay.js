const Discord = require("discord.js");
const ffmpeg = require("ffmpeg-binaries");
const opusscript = require("opusscript");
const customisation = require('../customisation.json');

exports.run = (client, message, args) => {
  
  if (args.length === 0)
  return message.reply("You didn't supplied a stream URL!");

    const streamURL = args.slice(0, args.length).join(" ");

      if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => {
            let embed = new Discord.RichEmbed()
            .setDescription(`**Connected!** Playing ${args.slice(0, args.length).join(" ")}`)
            .setColor('#ff9900')
            .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
            connection.playArbitraryInput(`${streamURL}`);
            message.channel.send(embed)
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
  name: 'radioplay',
  description: 'Play a radio of your choice',
  usage: 'radioplay [radio url]'
};
