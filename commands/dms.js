const Discord = require('discord.js');
const customisation = require('../customisation.json');

exports.run = (client, message, args) => {
    let msg = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 1) return message.reply('You must mention someone for me to dm them.');
    if (!message.author.id === '242263403001937920') return message.reply('You do not have the permission to use this command!');
    if (message.mentions.users.first().id === message.author.id) return message.reply('You can\'t DM yourself:facepalm:... Well you can, but WHY? ("Why not?" isn\'t accepted XD)');
    if (msg.length < 1) msg = 'Blank message. . .';

    const embed = new Discord.RichEmbed()
    .setColor(Math.floor(Math.random()*16777215))
    .setTimestamp()
    .setTitle("You have a new message")
    .addField('Remember:', `${user.username}, do not reply because ${message.author.username} will not recieve the reply`)
    .addField(`${message.author.username}'s message:`, msg)
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    message.mentions.users.first().send({embed}).catch(e =>{
      if (e) {
        return message.channel.send("That user unfortunately locked their DMs")
      }else{
        message.channel.send("Successfully sent your message")
      }
    });
    message.channel.fetchMessages({
      limit: 5
    }).then(messages => message.channel.bulkDelete(2));
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