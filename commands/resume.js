const {Util } = require('discord.js');
const settings = require('../settings.json');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core-discord');

const youtube = new YouTube(settings.GOOGLE_API_KEY);
const music = require('../music')

exports.run = (client, message, args) =>{
  const serverQueue = music.serverQueue(message.guild)
    if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        return message.channel.send('▶ Resumed!');
    }
    return message.channel.send('There is nothing playing.');
    
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
exports.help = {
    name: 'resume',
    description: 'Resume the paused song.',
    usage: 'resume'
  };