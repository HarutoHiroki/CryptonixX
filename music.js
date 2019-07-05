const {Util } = require('discord.js');
const settings = require('./settings.json');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core-discord');

const youtube = new YouTube(settings.GOOGLE_API_KEY);

const queue = new Map();

let loop = false;

module.exports = {
    serverQueue(guild) {
        return queue.get(guild.id);
    },
    getVoice(guild) {
        const serverQueue = queue.get(guild.id);
        return serverQueue.voiceChannel
    },
    async handleVideo(video, message, voiceChannel, playlist = false) {
        async function play(guild, song) {
            const serverQueue = queue.get(guild.id);

            if(voiceChannel.members.size === 1){
                message.channel.send("No one listening, Leaving voice.")
                serverQueue.voiceChannel.leave();
                queue.delete(guild.id);
                return;
            }
        
            if (!song) {
                message.channel.send("Queue ended, Leaving voice.")
                serverQueue.voiceChannel.leave();
                queue.delete(guild.id);
                return;
            }
            //console.log(serverQueue.songs);
        
            const dispatcher = serverQueue.connection.playOpusStream(await ytdl(song.url))
                .on('end', async reason => {
                    //if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
                    //console.log(serverQueue.loop)
                    if (serverQueue.loop === true) await serverQueue.songs.push(song)
                    serverQueue.songs.shift();
                    play(guild, serverQueue.songs[0]);
                })
                .on('error', error => {
                    message.channel.send(`An error occured: ${error}`)
                    return console.error(error)
                });
            dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);
        
            serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
        }
        const serverQueue = queue.get(message.guild.id);
        //console.log(video);
        const song = {
            id: video.id,
            title: Util.escapeMarkdown(video.title),
            url: `https://www.youtube.com/watch?v=${video.id}`
        };
        if (!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 100,
                playing: true,
                loop: false
            };
            queue.set(message.guild.id, queueConstruct);
    
            queueConstruct.songs.push(song);
    
            try {
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(message.guild, queueConstruct.songs[0]);
            } catch (error) {
                console.error(`I could not join the voice channel: ${error}`);
                queue.delete(message.guild.id);
                return message.channel.send(`I could not join the voice channel: ${error}`);
            }
        } else {
            serverQueue.songs.push(song);
            //console.log(serverQueue.songs);
            if (playlist) return undefined;
            else return message.channel.send(`✅ **${song.title}** has been added to the queue!`);
        }
        return undefined;
    }
}
