const Discord = require("discord.js");
const fs = require("fs");
const customisation = require('../customisation.json');

exports.run = async (client, message, args, prefix) => {
    const selfrole = require("../models/selfrole.js")
    let member = message.guild.member(message.author);
    if(!args[0] || args[0] == "help") return message.reply(`Usage: [p]getrole roleID ([p] is the bot's prefix)`);
    selfrole.findOne({
        serverID: message.guild.id
    }, (err, srid) => {
        if (err) console.error(err);
        if (!srid) {
            return message.channel.send(`This server doesn\'t have any selfroles!`)
        }else{
            role = srid.selfroleID.split(',')
            if (role.indexOf(args[0]) === -1){
                message.reply("That is not a self-assigned role")
                return
            }else{
                rolename = message.guild.roles.get(args[0])
                member.addRole(rolename).catch(e => {
                    return message.channel.send(`❌**Error:**\n${e}`);
                });

                let embed = new Discord.RichEmbed()
                  .setColor("#ff8200")
                  .setTitle("Role Given")
                  .setDescription(`Enjoy your new role!`)
                  .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);

                  message.channel.send({embed});
            }
        }
    })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "getrole",
  description: "Get Self-assignable Roles",
  usage: "getrole"
};
