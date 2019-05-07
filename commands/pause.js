const Discord = require('discord.js');
const settings = require('../settings.json');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core-discord');

const youtube = new YouTube(settings.GOOGLE_API_KEY);
const music = require('../music')

exports.run = (client, message, args) => {
  const serverQueue = music.serverQueue(message.guild)
    if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        return message.channel.send('⏸ Paused!');
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
    name: 'pause',
    description: 'Pause the current song.',
    usage: 'pause'
  };