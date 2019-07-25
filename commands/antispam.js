const Discord = require('discord.js');
const customisation = require('../customisation.json');
const https = require('https');
const fs = require('fs')
const mongoose = require('mongoose')

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("❌**Error:** You have to be an Admin to use this command!");
    if(!args) return message.reply("Usage: `antispam template|upload (file upload)`")
    if(args[0] === 'template'){
        message.channel.send("Here's the antilink settings template.", { files: ['./default.json'] });
    }else if(args[0] === 'upload'){
        if(!message.attachments.first() || message.attachments.first().filename.split('.').pop() !== 'json'){
            return message.reply("Please attach a proper .json file")
        }else{
        
        const file = fs.createWriteStream(`./temp/${message.guild.id}.json`);
        const request = https.get(message.attachments.first().url, async function(response) {
            await response.pipe(file);
            file.on(`finish`, async function() {
              await file.close(console.log(`Done Downloading`));  // close() is async, call cb after close completes.
              let antidata = JSON.parse(fs.readFileSync(`./temp/${message.guild.id}.json`, "utf8"))
                if(!antidata['antispam']){ 
                    message.reply('Please upload a proper/full settings file')
                    return fs.unlink(`./temp/${message.guild.id}.json`)
                }else if(!antidata['antispam'].status || !antidata['antispam'].warnBuffer || !antidata['antispam'].maxBuffer || !antidata['antispam'].maxtime || !antidata['antispam'].maxdupwarn || !antidata['antispam'].maxdupban || !antidata['antispam'].deleteno || !antidata['antispam'].exeptionroles){
                    message.reply('Please upload a proper/full settings file')
                    return fs.unlink(`./temp/${message.guild.id}.json`)
                }else if(parseInt(antidata['antispam'].status) == NaN || parseInt(antidata['antispam'].warnBuffer) == NaN || parseInt(antidata['antispam'].maxBuffer) == NaN || parseInt(antidata['antispam'].maxtime) == NaN || parseInt(antidata['antispam'].maxdupwarn) == NaN || parseInt(antidata['antispam'].maxdupban) == NaN || parseInt(antidata['antispam'].deleteno) == NaN){
                    if(!antidata['antispam'].banMessage || String(antidata['antispam'].banMessage).length < 5) return message.reply("banMessage must be a string and have at least 5 charcters length.");
                    if(!antidata['antispam'].warningMessage || String(antidata['antispam'].warningMessage).length < 5) return message.reply("warningMessage must be a string and have at least 5 characters.");
                    if (antidata['antispam'].exeptionroles !== 'none' && String(antidata['antispam'].exeptionroles).forEach(role => message.guild.roles.find(val => val.name === role) == undefined)) message.reply('Please check your role names again')
                    return fs.unlink(`./temp/${message.guild.id}.json`, function(err){
                        console.log(err)
                    });
                }else{
                    const antispamdata = require('../models/antispam.js')
                    antispamdata.findOne({
                        guildID: message.guild.id
                    }, async (err, antispamdat) => {
                        let rolestr = `'`
                        //String(antidata[`antispam`].exeptionroles).split(",").forEach(role => {
                        //  console.log(role)
                        //console.log(String(antidata[`antispam`].exeptionroles).split(",").length)
                        for(i = 1; i <= String(antidata[`antispam`].exeptionroles).split(",").length; i++){
                            rolestr = rolestr + String(antidata[`antispam`].exeptionroles).split(",")[i-1] + `'`
                            if(i == String(antidata[`antispam`].exeptionroles).split(",").length){
                                break
                            }else{
                                rolestr = rolestr + `,'`
                            }
                        }
                        //})
                        if(!antispamdat){
                            const newAntispam = new antispamdata({
                                _id: mongoose.Types.ObjectId(),
                                guildID: message.guild.id,
                                status: antidata['antispam'].status,
                                warnBuffer: antidata['antispam'].warnBuffer, 
                                maxBuffer: antidata['antispam'].maxBuffer,
                                maxtime: antidata['antispam'].maxtime,
                                warnMessage: antidata['antispam'].warnMessage,
                                banMessage: antidata['antispam'].banMessage,
                                maxdupwarn: antidata['antispam'].maxdupwarn,
                                maxdupban: antidata['antispam'].maxdupban,
                                deleteno: antidata['antispam'].deleteno,
                                exeptionroles: rolestr      
                            });
                            await newAntispam.save()
                            fs.unlink(`./temp/${message.guild.id}.json`, function(){
                                console.log("File deleted, success!")
                            })
                        }else{
                            antispamdat.status = antidata['antispam'].status,
                            antispamdat.warnBuffer = antidata['antispam'].warnBuffer, 
                            antispamdat.maxBuffer = antidata['antispam'].maxBuffer,
                            antispamdat.maxtime = antidata['antispam'].maxtime,
                            antispamdat.warnMessage = antidata['antispam'].warnMessage,
                            antispamdat.banMessage = antidata['antispam'].banMessage,
                            antispamdat.maxdupwarn = antidata['antispam'].maxdupwarn,
                            antispamdat.maxdupban = antidata['antispam'].maxdupban,
                            antispamdat.deleteno = antidata['antispam'].deleteno,
                            antispamdat.exeptionroles = rolestr 
                            await antispamdat.save()
                            fs.unlink(`./temp/${message.guild.id}.json`, function(){
                                console.log("File deleted, success!")
                            })
                        }
                    })
                    //antidata['antispam']
                }
            });
            }).on(`error`, async function(err) { // Handle errors
              await fs.unlink(`./temp/${message.guild.id}.json`, function(err){
                  console.log(err)
              }); // Delete the file async. (But we don't check the result)
            });
        }
        
    }else if(args[0] === 'current'){
        const antispamdata = require('../models/antispam.js')
            antispamdata.findOne({
                guildID: message.guild.id
            }, (err, antispamdat) => {
                if(!antispamdat || antispamdat.status === "off"){
                    return message.reply("Anti-spam for this server has been turned off or hasn't been set up")
                }else{
                    const embed = new Discord.RichEmbed()
                    .setTitle(`Anti-spam status for **${message.guild.name}**`)
                    .addField("Status", antispamdat.status)
                    .addField("Max message (Warn)", antispamdat.warnBuffer)
                    .addField("Max message (Ban)", antispamdat.maxBuffer)
                    .addField("Max time between messages (ms)", antispamdat.maxtime)
                    .addField("Warn message", antispamdat.warnMessage)
                    .addField("Ban message", antispamdat.banMessage)
                    .addField("Max duplicate (Warns)", antispamdat.maxdupwarn)
                    .addField("Max duplicate (Ban)", antispamdat.maxdupban)
                    .addField("Number of day(s) message deleted", antispamdat.deleteno)
                    .addField("Exemption roles", antispamdat.exeptionroles)
                    .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);

                    message.channel.send(embed)
                }
            })

    }else{
        return message.reply("Usage: `antispam template|upload (file upload)`")
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'antispam',
    description: 'Anti Spam setup',
    usage: 'antispam template|upload (file upload)'
  };
   