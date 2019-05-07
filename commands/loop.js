const {Util } = require('discord.js');
const settings = require('../settings.json');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core-discord');

const youtube = new YouTube(settings.GOOGLE_API_KEY);
const music = require('../music')

exports.run = (client, message, args) =>{
  const serverQueue = music.serverQueue(message.guild)
    if (!serverQueue) return message.channel.send('There is nothing playing.');
    if (serverQueue.loop !== true) {
        console.log(serverQueue.loop)
        serverQueue.loop = true;
        console.log(serverQueue.loop)
        return message.channel.send("Looping!")
    }
    if (serverQueue.loop !== false){
        console.log(serverQueue.loop)
        serverQueue.loop = false;
        console.log(serverQueue.loop)
        return message.channel.send("Stopped Looping!")
    }
    
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'loop',
  description: 'Loop the current song queue',
  usage: 'loop'
};