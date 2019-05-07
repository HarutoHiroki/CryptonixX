const { RichEmbed } = require("discord.js");
const ffmpeg = require("ffmpeg-binaries");
const opusscript = require("opusscript");
const customisation = require('../customisation.json');

exports.run = (client, message, args) => {
     let vol = args.join(" ");
const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == message.guild.id);
if (voiceConnection === null) return message.channel.send('No music is being played!');
const dispatcher = voiceConnection.player.dispatcher;
const currentvol = dispatcher.volume * 100;
if(!vol) {
    let embed = new RichEmbed()
    .setDescription(`**Current Volume:** ${currentvol}%`)
    .setColor('#ff9900')
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    return message.channel.send(embed);
}
		if (vol > 200 || vol < 0) return message.channel.send('Volume out of range!').then((response) => {
			response.delete(5000);
		});

        let embed = new RichEmbed()
        .setDescription("Volume set to " + vol)
        .setColor('#ff9900')
		.setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
		dispatcher.setVolume((vol/100));
        return message.channel.send(embed);
   };
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
    };
     
exports.help = {
  name: 'volume',
  description: 'Set Radio volume',
  usage: 'volume'
};