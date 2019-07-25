const Discord = require('discord.js');
const customisation = require('./customisation.json');

const mongoose = require('mongoose');

var authors = [];
var messageLog = [];

module.exports = async (client, options) => {
      const warnBuffer = (options && options.warnBuffer) || 2;
      const maxBuffer = (options && options.maxBuffer) || 4;
      const interval = (options && options.interval) || 2000; 
      const warningMessage = (options && options.warningMessage) || "please stop spamming!";
      const banMessage = (options && options.banMessage) || "has been hit by ban hammer for spamming!";
      const maxDuplicatesWarning = (options && options.maxDuplicatesWarning || 3);
      const maxDuplicatesBan = (options && options. maxDuplicatesBan || 5);
      const deleteMessagesAfterBanForPastDays = (options && options.deleteMessagesAfterBanForPastDays || 7);
      const exemptRoles = (options && options.exemptRoles) || [];
      const exemptUsers = (options && options.exemptUsers) || [];

      if(isNaN(warnBuffer)) throw new Error("warnBuffer must be a number.");
      if(isNaN(maxBuffer)) throw new Error("maxBuffer must be a number.");
      if(isNaN(interval)) throw new Error("interval must be a number.");
      if(!isNaN(banMessage) || banMessage.length < 5) throw new Error("banMessage must be a string and have at least 5 charcters length.");
      if(!isNaN(warningMessage) || warningMessage.length < 5) throw new Error("warningMessage must be a string and have at least 5 characters.");
      if(isNaN(maxDuplicatesWarning)) throw new Error("maxDuplicatesWarning must be a number.")
      if(isNaN(maxDuplicatesBan)) throw new Error("maxDuplicatesBan must be a number.");
      if(isNaN(deleteMessagesAfterBanForPastDays)) throw new Error("deleteMessagesAfterBanForPastDays must be a number.");
      if(exemptRoles.constructor !== Array) throw new Error("extemptRoles must be an array.");
      if(exemptUsers.constructor !== Array) throw new Error("exemptUsers must be an array.");

      // Custom 'checkMessage' event that handles messages
      client.on("checkMessage", async (message) => {
      const antispamstat = require('./models/antispam.js');
      antispamstat.find({
        guildID: message.guild.id
      }, (err, antispamstat) => {
        if (err) console.error(err);
        if (!antispamstat || antispamstat.stats === 'off') {
          return console.log('off')
      }else{
      // Ban the User
        const banUser = async (m, banMsg) => {
        for (var i = 0; i < messageLog.length; i++) {
            if (messageLog[i].author == m.author.id) {
              messageLog.splice(i);
            }
          }
        
          let user = m.guild.members.get(m.author.id);
          if (user) {
            user.ban(deleteMessagesAfterBanForPastDays, "AutoBan - User spam messages too much").then((member) => {
              m.channel.send(`<@!${m.author.id}>, ${banMsg}`);
            
              const embed = new Discord.RichEmbed()
              .setColor(0xFFFF00)
              .setTimestamp()
              .addField('Action:', 'Ban')
              .addField('User:', `${m.author.username}#${m.author.discriminator} (${m.author.id})`)
              .addField('Banned by:', `Cryptonix X#${client.user.discriminator}`)
              .addField('Reason', "AutoBan - User spam messages too much")
              .addField('Warn ID:', newWarn.warnid)
              .addField('Time', m.createdAt)
              .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
              let logchannel = m.guild.channels.find(val => val.name === 'logs');
              if  (!logchannel){
                m.channel.send({embed})
              }else{
                m.channel.send({embed})
                client.channels.get(logchannel.id).send({embed});
              }
              if(m.author.bot) return;
              m.author.send({embed}).catch(e =>{
                if(e) return 
              });
            
              return true;
           }).catch(() => {
              m.channel.send(`Oops, seems like i don't have sufficient permissions to ban <@!${m.author.id}>!`);
              return false;
          });
        }
      }


       // Warn the User
      const warnUser = async (m, reply) => {
      mongoose.connect('mongodb://localhost/DiscordDB', { useNewUrlParser: true });
      function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }
      
      const Warn = require('./models/warn.js');
        Warn.findOne({
          userID: m.author.id,
          serverID: m.guild.id,
        }, (err, warn) => {
          if (err) console.error(err);
          if (!warn) {
        const newWarn = new Warn({
            _id: mongoose.Types.ObjectId(),
            serverID: m.guild.id,
            username: m.author.username,
            userID: m.author.id,
            reason: "AutoWarn - Spamming",
            wUsername: "Cryptonix X",
            wID: client.user.id,
            warnid: makeid(7),
            time: m.createdAt
        });
        newWarn.save()
        .catch(e => console.log(e))
        const embed = new Discord.RichEmbed()
        .setColor(0xFFFF00)
        .setTimestamp()
        .addField('Action:', 'Warning')
        .addField('User:', `${m.author.username}#${m.author.discriminator} (${m.author.id})`)
        .addField('Warned by:', `Cryptonix X#${client.user.discriminator}`)
        .addField('Reason', "AutoWarn - Spamming")
        .addField('Warn ID:', newWarn.warnid)
        .addField('Time', m.createdAt)
        .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
        let logchannel = m.guild.channels.find(val => val.name === 'logs');
        if  (!logchannel){
          m.channel.send({embed})
        }else{
          m.channel.send({embed})
          client.channels.get(logchannel.id).send({embed});
        }
        if(m.author.bot) return;
        m.author.send({embed}).catch(e =>{
          if(e) return 
        });
      }else{
        const newWarn = new Warn({
          _id: mongoose.Types.ObjectId(),
          serverID: m.guild.id,
          username: m.author.username,
          userID: m.author.id,
          reason: "AutoWarn - Spamming",
          wUsername: "Cryptonix X",
          wID: client.user.id,
          warnid: makeid(7),
          time: m.createdAt
      });
        newWarn.save()
        .catch(e => console.log(e))
        const embed = new Discord.RichEmbed()
        .setColor(0xFFFF00)
        .setTimestamp()
        .addField('Action:', 'Warning')
        .addField('User:', `${m.author.username}#${m.author.discriminator} (${m.author.id})`)
        .addField('Warned by:', `Cryptonix X#${client.user.discriminator}`)
        .addField('Reason', "AutoWarn - Spamming")
        .addField('Warn ID:', newWarn.warnid)
        .addField('Time', m.createdAt)
        .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
        let logchannel = m.guild.channels.find(val => val.name === 'logs');
        if  (!logchannel){
          m.channel.send({embed})
        }else{
          m.channel.send({embed})
          client.channels.get(logchannel.id).send({embed});
        }
        if(m.author.bot) return;
        m.author.send({embed}).catch(e =>{
          if(e) return 
        });
      }
})    ;

      const cursor = Warn.find({
        userID: m.author.id,
        serverID: m.guild.id,
      })
      cursor.exec(async (err, result) => {
        if (err) {
          console.error(err);
        }
        //console.log(result.length)
        const punishstats = require('./models/punish.js')
        punishstats.findOne({
          guildID: m.guild.id,
      }, async (err, punish) => {
        if(!punish) return console.log("returned")
        if(punish.mutestatus === 'on'){
          if(result.length + 1 >= punish.mute){
            //console.log("muted")
            let user = m.author;
            let muteRole = client.guilds.get(m.guild.id).roles.find(val => val.name === 'Muted');
            if (!muteRole) {
              try {
                  muteRole = await m.guild.createRole({
                      name:"Muted",
                      color: "#000000",
                      permissions:[]
                  });

                  m.guild.channels.forEach(async (channel, id) => {
                      await channel.overwritePermissions(muteRole, {
                          SEND_MESSAGES: false,
                          MANAGE_MESSAGES: false,
                          READ_MESSAGES: false,
                          ADD_REACTIONS: false
                      });
                  });
              } catch(e) {
                  console.log(e.stack);
              }
            }
            if (m.guild.member(user).roles.has(muteRole.id)) {
             return
            } else {
              m.guild.member(user).addRole(muteRole).then(() => {
                let logchannel = m.guild.channels.find(val => val.name === 'logs');
                if(!logchannel){
                  m.channel.send("***" + m.author.username + "***" + ` has been auto-muted for exeeding ${punish.mute} warns`)
                return
              }else{
                m.channel.send("***" + m.author.username + "***" + ` has been auto-muted for exeeding ${punish.mute} warns`)
                client.channels.get(logchannel.id).send("***" + m.author.username + "***" + ` has been auto-muted for exeeding ${punish.mute} warns`).catch(console.error);
              }
            })
            }
          }
        }
      })

      punishstats.findOne({
        guildID: m.guild.id
      }, (err, punish) => {
        if(!punish) return
          if(punish.mutestatus === 'on'){
            if(result.length >= punish.ban){
              let user = m.author
              if (!m.guild.member(user).bannable) {
                m.channel.send(`:redTick: I cannot ban that member. My role might not be high enough or it's an internal error.`);
                return
              }
              m.author.ban("AutoBan - User has too many warns").then(() => {
                let logchannel = m.guild.channels.find(val => val.name === 'logs');
                if(!logchannel){
                  m.channel.send("***" + m.author.username + "***" + ` has been auto-banned for exeeding ${punish.ban} warns`)
                  return
                }else{
                  m.channel.send("***" + m.author.username + "***" + ` has been auto-banned for exeeding ${punish.ban} warns`)
                  client.channels.get(logchannel.id).send(m.author.username + ` has been auto-banned for exeeding ${punish.ban} warns`).catch(console.error);
                }
                if(m.author.bot) return;
                return m.author.send(`You have been auto-banned for having ${punish.ban} or more warns!`).catch(e =>{
                  if(e) return
                });
              })
            }
          }
        })
      })

        m.channel.send(`<@${m.author.id}>, ${reply}`); // Regular Mention Expression for Mentions
       }

        if (message.author.bot) return;
        if (message.channel.type !== "text" || !message.member || !message.guild || !message.channel.guild) return;
        if(message.guild.id === '264445053596991498') return

        if (message.member.roles.some(r => exemptRoles.includes(r.name)) || exemptUsers.includes(message.author.tag)) return;

        if (message.author.id !== client.user.id) {
          let currentTime = Math.floor(Date.now());
          authors.push({
            "time": currentTime,
            "author": message.author.id
          });

          messageLog.push({
            "message": message.content,
            "author": message.author.id
          });

          let msgMatch = 0;
          for (var i = 0; i < messageLog.length; i++) {
            if (messageLog[i].message == message.content && (messageLog[i].author == message.author.id) && (message.author.id !== client.user.id)) {
              msgMatch++;
            }
          }

          if (msgMatch == maxDuplicatesWarning) {
            warnUser(message, warningMessage);
          }

          if (msgMatch == maxDuplicatesBan) {
            banUser(message, banMessage);
          }

          var matched = 0;

          for (var i = 0; i < authors.length; i++) {
            if (authors[i].time > currentTime - interval) {
              matched++;
              if (matched == warnBuffer) {
                warnUser(message, warningMessage);
              } else if (matched == maxBuffer) {
                banUser(message, banMessage);
              }
            } else if (authors[i].time < currentTime - interval) {
              authors.splice(i);
            }

            if (messageLog.length >= 200) {
              messageLog.shift();
            }      
          }
        }
      }
    });
  })
}
