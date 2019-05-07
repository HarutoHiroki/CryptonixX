const Discord = require('discord.js');
const settings = require('../settings.json');
const customisation = require('../customisation.json');
exports.run = (client, message, args) => {
  if(message.author.id !== settings.ownerid) return message.channel.send(`${message.author}, ${customisation.ownercmdfailtext}`);
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);
  if (message.mentions.users.first().id === "242263403001937920") return message.reply("You can't kick my Developer:wink:");
  if (reason.length < 1) reason = 'No reason supplied';

  if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member');
  message.guild.member(user).kick();

  const embed = new Discord.RichEmbed()
    .setColor(0x0000FF)
    .setTimestamp()
    .addField('Action:', 'Kick')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason)
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
  message.channel.send('<a:balancecheck:556017659419033653> Success!')
  return;
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["owneryeet"],
  permLevel: 0
};

exports.help = {
  name: 'ownerkick',
  description: 'Kicks the mentioned user.',
  usage: 'ownerkick [mention] [reason]'
};
