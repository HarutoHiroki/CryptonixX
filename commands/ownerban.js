const Discord = require('discord.js');
const settings = require('../settings.json');
const customisation = require('../customisation.json');
exports.run = (client, message, args) => {
  if(message.author.id !== settings.ownerid) return message.channel.send(`${message.author}, ${customisation.ownercmdfailtext}`);
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);
  if (message.mentions.users.first().id === message.author.id) return message.reply('I can\' let you do that, self-harm is bad:facepalm:');
  if (message.mentions.users.first().id === "242263403001937920") return message.reply("You can't ban my Developer:wink:");
  if (reason.length < 1) reason = 'No reason supplied.';
  if (!message.guild.member(user).bannable) return message.reply(`:redTick: I cannot ban that member`);
  const embed = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .addField('Action:', 'Ban')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason)
    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    message.channel.send(`:hammer: Done. You don't have to worry about that shit head anymore, I have banned them!`)
    message.mentions.users.first().send({embed});
    message.guild.member(user).ban(reason);
  return;
};
  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ownerbigyeet"],
  permLevel: 0
};

exports.help = {
  name: 'ownerban',
  description: 'Bans the mentioned user.',
  usage: 'ownerban [mention] [reason]'
};
