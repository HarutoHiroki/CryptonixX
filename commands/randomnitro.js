const emojis = require('../data/emojis.json');
exports.run = (client, message, args) => {
    args = args.join(" ");
    message.delete();
    message.channel.send(`${emojis[Math.floor(Math.random() * emojis.length)]}`);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["rndn"],
  permLevel: 0
};

exports.help = {
  name: 'randomnitro',
  description: 'Sends a random Nitro emoji.',
  usage: 'randomnitro'
};
