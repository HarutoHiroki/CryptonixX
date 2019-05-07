
const settings = require('../settings.json');
const customisation = require('../customisation.json');
exports.run = (client, message, args) => {
  if(message.author.id !== settings.ownerid) return message.channel.send(`${message.author}, ${customisation.ownercmdfailtext}`);
    //if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("❌**Error:** You don't have the **Manage Messages** permission!");
    if (!args[0]) return message.channel.send("You need to specidy an amount");
    let messagecount = parseInt(args.join(' '));
    message.channel.fetchMessages({
      limit: 100
    }).then(messages => message.channel.bulkDelete(messagecount));
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'ownerpurge',
    description: 'Purges X amount of messages from a given channel.',
    usage: 'pwnerpurge <number>'
  };
  