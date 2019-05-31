const Discord = require("discord.js");
const fs = require("fs");
const customisation = require('../customisation.json');

exports.run = async (client, message, args, prefix) => {
    let member = message.guild.member(message.author);
    if(!args[0] || args[0] == "help") return message.reply(`Usage: [p]abandonrole rolename ([p] is the bot's prefix)`);
    let selfrole = JSON.parse(fs.readFileSync("./selfrole.json", "utf8"));
    if(!selfrole[message.guild.id]){
        return message.reply("This server don't have any self-assignable roles!")
    }else{
        role = selfrole[message.guild.id].selfrole.split(',')
        
            if (role.indexOf(args[0]) === -1){
                message.reply("That is not a self-assigned role")
                return
            }else{
                rolename = message.guild.roles.get("name", args[0])
                member.removeRole(rolename).catch(e => {
                    return message.channel.send(`❌**Error:**\n${e}`);
                });

                let embed = new Discord.RichEmbed()
                  .setColor("#ff8200")
                  .setTitle("Role Removed <a:balancecheck:556017659419033653>")
                  .setDescription(`Hope to see u again with this role!`)
                  .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);

                  message.channel.send({embed});
                  return;
            }
    }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "abandonrole",
  description: "Abandon Self-assignable Roles",
  usage: "abandonrole"
};