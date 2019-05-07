const { RichEmbed } = require("discord.js");
const { get } = require("axios");
const superagent = require('superagent');
const customisation = require('../customisation.json');

exports.run = async (client, message, args) => {
//const data = await get('https://qtradio.moe/stats', { 'User-Agent': `moe/latest/bot` }); //Partially ported from qtradio site/desktop app
const { body } = await superagent
.get("https://qtradio.moe/stats");
let data = body.icestats.source[0];
if (data === undefined) data = data.body.icestats.source;
const nowPlaying =  "\n" + "Artist: " + data.artist + "\n" + "Title: " + data.title;

if (message.member.voiceChannel) {
    let embed = new RichEmbed()
        .setDescription(`**Now Playing**: ${nowPlaying}`)
        .setColor('#ff9900')
		.setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    message.channel.send(embed);
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
  name: 'qtnp',
  description: 'qtradio.moe now playing',
  usage: 'qtnp'
};