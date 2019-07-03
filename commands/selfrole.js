const Discord = require("discord.js");
const customisation = require('../customisation.json');
const mongoose = require('mongoose');
exports.run = async (client, message, args, prefix) => {
    const selfrole = require("../models/selfrole.js")
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`:facepalm: You can't do that BOIII! :facepalm:`);
    if(!args.join(" ") || args[0] == "help") return message.reply(`Usage: [p]selfrole add roleid1,roleid2,... ([p] is the bot's prefix); [p]selfrole clear (to clear the selfrole list)`);
    if(args[0] !== "add" && args[0] !== "clear" && args[0] !== "list") return message.reply(`Usage: [p]selfrole role1,role2,... ([p] is the bot's prefix); [p]selfrole clear (to clear the selfrole list)`);
    if(args[0] === "clear") {
        var MongoClient = require('mongodb').MongoClient;
          var url = "mongodb://localhost:27017/";
          MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("DiscordDB");
            var myquery = {
              serverID: message.guild.id 
            };
            dbo.collection("selfroles").deleteMany(myquery, function(err, obj) {
              if (err){ 
                message.channel.send("Error: ",err)
                throw err
              };
              message.channel.send("All selfrole(s) have been cleared!");
              db.close();
            });
          });
    }
    if(args[0] === "add"){
        if (!args[1]) return message.reply(`Usage: [p]selfrole add roleid1,roleid2,... ([p] is the bot's prefix); [p]selfrole clear (to clear the selfrole list)`);
        srole = args[1].split(',')
        let allowedString = ''
        fsrole = ''
        srole.forEach((role) => {
            let rsrole = message.guild.roles.get(role);
            if (!rsrole){
              return message.reply(`${role} isn't a role on this Server!`)
            }else{
                let botRolePosition = message.guild.member(client.user).highestRole.position;
                let rolePosition = role.position;
                if (botRolePosition <= rolePosition) return message.channel.send(`❌**Error:** Failed to add ${message.guild.roles.get(role).name} to the selfrole list because my highest role is lower than the specified role.`);
                allowedString = allowedString.concat('- ' + message.guild.roles.get(role).name + " ID: " + message.guild.roles.get(role).id + '\n')
                fsrole = fsrole.concat(role + ',')
            }
        })
            selfrole.findOne({
                serverID: message.guild.id 
            }, (err, srid) => {
                if (err) console.error(err);
                if (!srid) {
                
                    const newSelfrole = new selfrole({
                        _id: mongoose.Types.ObjectId(),
                        serverID: message.guild.id,
                        selfroleID: fsrole,
                    });

                    newSelfrole.save()
                    //.then(result => console.log(result))
                    .catch(err => console.error(err));
                    let embed = new Discord.RichEmbed()
                    .setColor("#ff8200")
                    .setTitle("Self-Role Added")
                    .setDescription(`Self Assignable Roles: \n${allowedString}`)
                    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);

                    message.channel.send({embed});
                }else{
                    srid.selfroleID = srid.selfroleID.concat(fsrole);
                    srid.save()
                    //.then(result => console.log(result))
                    .catch(err => console.error(err));
                    eh = srid.selfroleID.split(',')
                    newselfrole = ''
                    eh.forEach((rolee) => {
                        //console.log(rolee)
                        if(rolee.length > 5){
                            newselfrole = newselfrole.concat('- ' + message.guild.roles.get(rolee).name + " ID: " + message.guild.roles.get(rolee).id + '\n')
                        }
                    })
                    let embed = new Discord.RichEmbed()
                    .setColor("#ff8200")
                    .setTitle("Self-Role Added")
                    .setDescription(`Self Assignable Roles: \n${newselfrole}`)
                    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);

                    message.channel.send({embed});
                }
            });
            
    }
    if(args[0] === 'list'){
        selfrole.findOne({
            serverID: message.guild.id
        }, (err, srid) => {
            if (err) console.error(err);
            if (!srid) {
                return message.channel.send(`This server doesn\'t have any selfroles!`)
            }else{
                srname = srid.selfroleID.split(',')
                let allowedString = ''
                srname.forEach((roleid) => {
                    if(roleid.length > 5){
                        //console.log(roleid)
                        rolename = message.guild.roles.get(roleid).name
                        allowedString = allowedString.concat('- ' + rolename + " - ID: " + roleid + '\n')
                    }
                })
                let embed = new Discord.RichEmbed()
                .setColor("#ff8200")
                .setTitle("Self-Role List")
                .setDescription(`Self Assignable Roles: \n${allowedString}`)
                .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);

                message.channel.send({embed});
            }
        })
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "selfrole",
    description: "Create Self-assignable Roles",
    usage: "selfrole clear|list|add roleID"
};