const chalk = require('chalk');
const Discord = require('discord.js');
const settings = require('../settings.json');
const client = new Discord.Client();
const activities = require('../data/activities.json');
const DBL = require("dblapi.js");
const dbl = new DBL(settings.dblapitoken, client);
const fs = require('fs');
module.exports = client => {
  setInterval(() => {
    dbl.postStats(client.guilds.size);
    client.user.setPresence({ game: { name: `${activities[Math.floor(Math.random() * activities.length) + 1]}`, type: 1, url: "https://www.twitch.tv/hiroaki_haruto" }})
  },60000);
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