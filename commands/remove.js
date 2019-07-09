const {Util } = require('discord.js');
const settings = require('../settings.json');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core-discord');

const youtube = new YouTube(settings.GOOGLE_API_KEY);
const music = require('../music')

exports.run = (client, message, args) =>{
    if(message.author.id !== settings.ownerid && message.author.id !== "365338201042452480") return message.reply("What makes you think that you can use this command scrub?")
    if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
    if (!args[0]) return message.reply("I can only skip numbers, not spaces and nothingness :joy:")
    if (parseInt(args[0]) == NaN) return message.reply("I can only skip numbers, not textes :joy:")
	const serverQueue = music.serverQueue(message.guild)
	if (!serverQueue) return message.channel.send('There is nothing playing to skip.');
    let num = parseInt(args[0])
    serverqueue.songs.splice(num, 1)
	message.channel.send("Removed!")
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'remove',
  description: 'Remove a song.',
  usage: 'remove [number on queue]'
};