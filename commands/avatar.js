const Discord =  require('discord.js');
const customisation = require('../customisation.json');
exports.run = (client, msg, args) => {
    let avatar = msg.mentions.users.size ? msg.mentions.users.first().avatarURL : msg.author.avatarURL;
    if (msg.mentions.users.size > 0) {
      const embed = new Discord.RichEmbed()
        .setColor(0xFFFF00)
        .setTitle(`Avatar for ${msg.mentions.users.first().username}:`)
        .setImage(`${avatar}`)
        .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
        msg.channel.send({embed});
    } else {
      const embed = new Discord.RichEmbed()
      .setColor(0xFFFF00)
      .setTitle(`Avatar for ${msg.author.username}:`)
      .setImage(`${avatar}`)
      .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
      msg.channel.send({embed});
    }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'avatar',
  description: 'Fetches a user\'s avatar.',
  usage: 'avatar <user>'
};
