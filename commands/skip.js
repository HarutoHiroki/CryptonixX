const {Util } = require('discord.js');
const settings = require('../settings.json');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core-discord');

const youtube = new YouTube(settings.GOOGLE_API_KEY);
const music = require('../music')

exports.run = (client,message,args) => {
	const serverQueue = music.serverQueue(message.guild)
    if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing to skip.');
		serverQueue.connection.dispatcher.end('Skipped!');
		message.channel.send("Skipped!")
		return undefined;
}
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'skip',
	description: 'Skip the current song.',
	usage: 'skip'
};