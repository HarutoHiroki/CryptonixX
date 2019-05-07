const Discord = require('discord.js');
const settings = require('../settings.json');
const customisation = require('../customisation.json');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  //let logchannel = message.guild.channels.find('name', 'logs');
  //if (!logchannel) return message.channel.send('I cannot find a logs channel');
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(":no_entry_sign: **Error:** You don't have the **Ban Members** permission!");
  if (message.mentions.users.size < 1) return message.channel.send('You must mention someone to ban them.').catch(console.error);
  if (message.mentions.users.first().id === message.author.id) return message.channel.send('I can\' let you do that, self-harm is bad:facepalm:');
  if (user.id === client.user.id) return message.channel.send("You pleblord, how can you use a bot to ban itself?:joy:");
  if (message.mentions.users.first().id === "242263403001937920") return message.channel.send("You can't ban my Developer:wink:");
  
  message.channel.send(":hammer: Done. I have B(e)aned them! <:gnome:572419430248873984>")
};

  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'bean',
  description: 'Beans the mentioned user.',
  usage: 'bean [mention] [reason]'
};
