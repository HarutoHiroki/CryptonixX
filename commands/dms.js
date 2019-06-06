const Discord = require('discord.js');
const customisation = require('../customisation.json');

exports.run = (client, message, args) => {
  message.delete();
    let msg = args.slice(1).join(' ');
    let user = message.mentions.users.first() || message.guild.members.get(args[0])
    if(!user) return message.reply('You must mention someone or provide a valid UserID for me to dm them.');
    //if (!message.author.id === '242263403001937920') return message.reply('You do not have the permission to use this command!');
    if (user.id === message.author.id) return message.reply('You can\'t DM yourself:facepalm:... Well you can, but WHY? ("Why not?" isn\'t accepted XD)');
    if (msg.length < 1) msg = 'Blank message. . .';

    const embed = new Discord.RichEmbed()
    .setColor(Math.floor(Math.random()*16777215))
    .setTimestamp()
    .setTitle(`You have a new message from ${message.author.username}!`)
    .addField('Remember:', `Do not reply to me because ${message.author.username} will not recieve the reply, take your stuff to their dms instead :)`)
    .addField(`${message.author.username}'s message:`, msg)
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    user.send({embed}).catch(e =>{
      if (e) {
        return message.channel.send("That user unfortunately locked their DMs")
      }else{
        message.channel.send("Successfully sent your message").then(message => {message.delete(1500)})
      }
    });
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'dms',
    description: 'DMs the mentioned user',
    usage: 'dms [message]'
  };