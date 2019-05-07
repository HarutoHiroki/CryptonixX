exports.run = function(client, message, args) {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("❌**Error:** You don't have the **Manage Messages** permission!");
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
  name: 'purge',
  description: 'Purges X amount of messages from a given channel.',
  usage: 'purge <number>'
};
