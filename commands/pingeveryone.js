
exports.run = (client, message) => {
    message.delete();
    message.channel.send("@everyone @here");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pe"],
  permLevel: 5
};

exports.help = {
  name: 'pingeveryone',
  description: 'Server ping everyone',
  usage: 'pingeveryone'
};
