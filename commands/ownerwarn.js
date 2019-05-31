const Discord = require('discord.js');
const fs = require("fs");
const ms = require("ms");
const settings = require('../settings.json');
const customisation = require('../customisation.json');
exports.run = async (client, message, args) => {
  if(message.author.id !== settings.ownerid) return message.channel.send(`${message.author}, ${customisation.ownercmdfailtext}`);
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);
  if (message.mentions.users.first().id === message.author.id) return message.reply('I can\' let you do that, self-harm is bad:facepalm:');
  if (message.mentions.users.first().id === "242263403001937920") return message.reply("You can't warn my Developer:wink:");
  //if (!logchannel) return message.reply('I cannot find a warn logs channel');
  if (reason.length < 1) reason = 'No reason supplied.';
  
  if(!warns[`${user.id}, ${message.guild.id}`]) warns[`${user.id}, ${message.guild.id}`] = {
    warns: 0
  };

  warns[`${user.id}, ${message.guild.id}`].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), err => {
    if(err) throw err;
  });

  const embed = new Discord.RichEmbed()
  .setColor(0xFFFF00)
  .setTimestamp()
  .addField('Action:', 'Warning')
  .addField('User:', `${user.username}#${user.discriminator}`)
  .addField('Warned by:', `${message.author.username}#${message.author.discriminator}`)
  .addField('Number of warnings:', warns[`${user.id}, ${message.guild.id}`].warns)
  .addField('Reason', reason)
  .setFooter('© Cryptonix X Mod Bot by That1WeebDood');
  message.mentions.users.first().send({embed})
  message.channel.send({embed});

  if(warns[`${user.id}, ${message.guild.id}`].warns == 2){
    let muteRole = message.guild.roles.get('name', 'Muted')

    let mutetime = "60s";
    message.guild.members.get(user.id).addRole(muteRole.id);
    message.reply(`${user.tag} has been temporarily muted`);

    setTimeout(function(){
      message.guild.members.get(user.id).removeRole(muteRole.id)
    }, ms(mutetime))
  }

  if(warns[`${user.id}, ${message.guild.id}`].warns == 3){
    message.guild.member(user).kick(reason);
    message.reply('That Dumb Boi have been kicked :facepalm:')
  }

  if(warns[`${user.id}, ${message.guild.id}`].warns == 5){
    message.guild.member(user).ban(reason);
    message.reply('You won\' have to worry about that shit-head any longer, I have Banned them!');
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ownersmolyeet"],
  permLevel: 0
};

exports.help = {
  name: 'ownerwarn',
  description: 'Issues a warning to the mentioned user.',
  usage: 'ownerwarn [mention] [reason]'
};
