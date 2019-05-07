const {Util } = require('discord.js');
const settings = require('../settings.json');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core-discord');

const youtube = new YouTube(settings.GOOGLE_API_KEY);
const music = require('../music')

exports.run = (client, message, args) =>{
    const serverQueue = music.serverQueue(message.guild)
    if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`
__**Song queue:**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

**Now playing:** ${serverQueue.songs[0].title}
		`);
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