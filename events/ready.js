const chalk = require('chalk');
const Discord = require('discord.js');
const settings = require('../settings.json');
const client = new Discord.Client();
const activities = require('../data/activities.json');
const DBL = require("dblapi.js");
const dbl = new DBL(settings.dblapitoken, client);
const fs = require('fs');
const antispam = require('../anti_spam.js');
module.exports = client => {
  const guildsid = require('../models/guild.js');
    guildsid.find({
      dbID: 333
    }, (err, guildsid) => {
      if (err) console.error(err);
      if (!guildsid) {
        return
      }else{
        const data = require('../models/antispam.js');
        data.find({
          guildID: guildsid.guildID
        }, (err, antispamstat) => {
          if (err) console.error(err);
          if (!antispamstat || antispamstat.stats === 'off') {
            return
          }else{
            antispam(client, {
              warnBuffer: antispamstat.warnBuffer, // Maximum ammount of messages allowed to send in the interval time before getting warned.
              maxBuffer: antispamstat.maxBuffer, // Maximum amount of messages allowed to send in the interval time before getting banned.
              interval: antispamstat.maxtime, // Amount of time in ms users can send the maxim amount of messages(maxBuffer) before getting banned. 
              warningMessage: antispamstat.warnMessage,//"please stop spamming!", // Message users receive when warned. (message starts with '@User, ' so you only need to input continue of it.) 
              banMessage: antispamstat.banMessagem,//"has been hit by ban hammer for spamming!", // Message sent in chat when user is banned. (message starts with '@User, ' so you only need to input continue of it.) 
              maxDuplicatesWarning: antispamstat.maxdupwarn,// Maximum amount of duplicate messages a user can send in a timespan before getting warned.
              maxDuplicatesBan: antispamstat.maxdupban, // Maximum amount of duplicate messages a user can send in a timespan before getting banned.
              deleteMessagesAfterBanForPastDays: antispamstat.deleteno, // Deletes the message history of the banned user in x days.
              exemptRoles: [antispamstat.exeptionroles], // Name of roles (case sensitive) that are exempt from spam filter.
              exemptUsers: []
            });
          }
        })
      }
    })

  setInterval(() => {
    dbl.postStats(client.guilds.size);
  },300000);

  setInterval(() => {
    dbl.postStats(client.guilds.size);
    client.user.setPresence({ game: { name: `${activities[Math.floor(Math.random() * activities.length) + 1]}`, type: 1, url: "https://www.twitch.tv/hiroaki_haruto" }})
  },60000);

  setInterval(() => {
    const guildsid = require('../models/guild.js');
    guildsid.find({
      dbID: 333
    }, (err, guildsid) => {
      if (err) console.error(err);
      if (!guildsid) {
        return
      }else{
        let guild = client.guilds.get(guildsid.guildID)
        if(!guild){
          const MongoClient = require('mongodb').MongoClient;
            const url = "mongodb://localhost:27017/";
            MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
              if (err) throw err;
              const dbo = db.db("DiscordDB");
              const myquery = {
                dbID: 333,
                guildID: guildsid.guildID
              };
              dbo.collection("guilds").deleteOne(myquery, function(err, obj) {
                if (err){ 
                  throw err
                };
                //console.log("Done 1")
                db.close();
              });
              dbo.collection("warns").deleteMany(myquery, function(err, obj) {
                if (err){ 
                  throw err
                };
                //console.log("Done 2")
                db.close();
              });
              dbo.collection("xps").deleteMany(myquery, function(err, obj) {
                if (err){ 
                  throw err
                };
                //console.log("Done 3")
                db.close();
              });
              dbo.collection("antispams").deleteMany(myquery, function(err, obj) {
                if (err){ 
                  throw err
                };
                //console.log("Done 3")
                db.close();
              });
              dbo.collection("selfroles").deleteMany(myquery, function(err, obj) {
                if (err){ 
                  throw err
                };
                //console.log("Done 4")
                db.close();
              });
            });
        }
      }
    })
  },1000);
  console.log(chalk.bgGreen.black(`Online and ready to serve ${client.guilds.size} servers.`));
  let blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
    client.guilds.forEach((guild) => {
      if (!blacklist[guild.ownerID]) {
        return;
      }else{
        if(blacklist[guild.ownerID].state === true) {
          message.guild.leave(guild.id)
        }
      }
    })
};