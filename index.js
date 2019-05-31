const Discord = require("discord.js");
const client = new Discord.Client();
const DBL = require("dblapi.js");
const settings = require('./settings.json');
const dbl = new DBL(settings.dblapitoken, client);
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
//const mysql = require('mysql');
//const file = require('./mysql.json');
const mongoose = require('mongoose')
const activities = require('./data/activities.json');
db = require('quick.db');
require('./util/eventLoader')(client);

//loading messages
const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Command Loaded! ${props.help.name} 👌`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.on('ready', guild => {
  setInterval(() => {
    dbl.postStats(client.guilds.size);
    let owner = client.guilds.get(guild.ownerID)
    if(owner !== settings.ownerid){
      if(guild.id === '264445053596991498') return
      let botCount = client.guilds.get(guild.members.filter(m => m.user.bot).size)
      let memCount = client.guilds.get(guild.members.filter(m => !m.user.bot).size)
      if (memCount < 5 || botCount >= 9){ 
        guild.owner.send("This server have too much bots (9+) or has too few members. Try again later!")
        return guild.leave()
      }
    }
  }, 60000);
});

client.on("guildCreate", guild => {
  let channelID;
  let channels = guild.channels;
  channelLoop:
  for (let c of channels) {
      let channelType = c[1].type;
      if (channelType === "text") {
          channelID = c[0];
          break channelLoop;
      }
  }

  let owner = client.guilds.get(guild.ownerID)
  if(owner !== settings.ownerid){
    if(guild.id === '264445053596991498') return
    let channel = client.channels.get(guild.systemChannelID || channelID);
    let botCount = client.guilds.get(guild.members.filter(m => m.user.bot).size)
    let memCount = client.guilds.get(guild.members.filter(m => !m.user.bot).size)
    if (memCount < 5 || botCount >= 9){ 
      guild.owner.send("This server have too much bots (9+) or has too few members. Try again later!")
      return guild.leave()
    }
    channel.send(`Thanks for inviting me into this server! Please do /info and /help for the informations you WILL need in order for the bot to work properly. Do /suggest or /bug if there's any suggestions or bug you found. THANKS`);
    channel.send("Join me in the Developer's server https://discord.gg/2NQbbPN");
  
    let blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
      client.guilds.forEach((guild) => {
        if (!blacklist[guild.ownerID]) return
        if(blacklist[guild.ownerID].state === true) {
          message.channel.send("But UNFORTUNATELY, the owner of this server has been blacklisted before so I'm LEAVING! Bye!")
          message.guild.leave(guild.id)
        }
      })
  }
});

//command reload
client.reload = command => {
  //if(message.author.id !=="242263403001937920") return message.channel.send(`**»** ${message.author}, you don't have permission to do that❌`);
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

mongoose.connect('mongodb://localhost:27017/DiscordDB', { useNewUrlParser: true }, err => {
    if (err) return console.error(err);
    console.log(chalk.bgGreen.black('Connected to MongoDB database!'));
});

  client.on('guildMemberAdd', async (member) => {
    let autoRole = await db.fetch(`autorole_${member.guild.id}`);
    if (!autoRole) return;
    if (autoRole === 'none') return;
    let autorole = member.guild.roles.get('name', autoRole);
    member.addRole(autorole);
});

//client command elevation(permLevel)
client.elevation = message => {
  if (message.channel.type === 'dm') return;
  let permlvl = 0;
  let mod_role = message.guild.roles.get('name', settings.modrolename);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 1;
  let admin_role = message.guild.roles.get('name', settings.adminrolename);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 2;
  let manager_role = message.guild.roles.get('name', settings.managerrolename);
  if (manager_role && message.member.roles.has(manager_role.id)) permlvl = 3;
  let overlord_role = message.guild.roles.get('name', settings.overlordrolename)
  if (overlord_role && message.member.roles.has(overlord_role.id)) permlvl = 4;
  if (message.author.id === settings.ownerid) permlvl = 5;
  return permlvl;
};

//ping log 
//var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
//client.on('debug', e => {
//  console.log(e.replace(regToken, 'that was redacted'));
//});


client.login(settings.token);
