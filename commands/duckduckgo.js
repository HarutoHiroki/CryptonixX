const search = require('node-ddg').default;
const Discord = require('discord.js');
const customisation = require('../customisation.json');
exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send("You must imput something for me to search!");

    let options = {
      count: 0,
      offset: 0,
      lang: "en-US,en;q=0.9",
      debug: false,
      show: false,
      screenshot: false,
      wait: 0
    };

    //search.duckduckgo(args.join("+"), options)
    search({ query: args.join("+"), maxResults: 3 })
    //.then(function(results){
      .then((results) => {
        for(let i = 0; i < 10; i++) {
          if(i > results.length - 1) {
              break;
          }
      //const embed = new Discord.RichEmbed()
      //  .setColor(0xdb3236)
      //  .setAuthor(`Results for ${args.join(' ')}`)
      //  .addField(results)
      //  .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`)
      //message.channel.send({embed}).catch(e => {
      //  if (e) return message.channel.send("There was an error!\n" + e);
      //});
      //message.channel.send(results.links)
      message.channel.send(`\n**${results[i].title}** \n${results[i].body} \n${results[i].url}`)
        }
      //console.log(results)
    })
    .catch((error) => { 
      message.channel.send("There was an error!\n" + error);
      return console.error('oups', error); 
    });    
    
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ddg','g'],
  permLevel: 0
};

exports.help = {
  name: 'duckduckgo',
  description: 'Searches something.',
  usage: 'duckduckgo <query>'
};
