exports.run = function(client, message, args) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("❌**Error:** You don't have the **Manage Messages** permission!");
    //if (!args[0]) return message.channel.send("You need to specify an amount");
    //let messagecount = parseInt(args.join(' '));
    message.channel.fetchMessages({
      limit: 100
  }).then(messages => {
    const userMessages = messages.filter(message => message.author.bot) 
    message.channel.bulkDelete(userMessages)
  }).catch(e => {
    if(e) return message.reply("Error: ", e)
  })
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'purgebot',
    description: 'Purges all messages from bots from a given channel.',
    usage: 'purgebot'
  };
  