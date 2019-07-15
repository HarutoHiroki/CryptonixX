const {Util } = require('discord.js');
const settings = require('../settings.json');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core-discord');

const youtube = new YouTube(settings.GOOGLE_API_KEY);
const music = require('../music')

exports.run = (client, message, args) =>{
    const serverQueue = music.serverQueue(message.guild)
    if (!serverQueue) return message.channel.send('There is nothing playing.');
    let str = ''
    for(y = 0; y < serverQueue.songs.length; y++) {
      str = str + `**${y}.**` + serverQueue.songs[y].title + '\n'
    }
    // serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')
    let newStr = str.match(/(.|[\r\n]){1,2000}/g);
    for(i = 0; i < newStr.length; i++){
      message.channel.send(`
__**Song queue:**__

${newStr[i]}

**Now playing:** ${serverQueue.songs[0].title}
		`);
    }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'queue',
  description: 'List the song queue.',
  usage: 'queue'
};