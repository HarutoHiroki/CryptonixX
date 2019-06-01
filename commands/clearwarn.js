const Discord = require('discord.js');
const fs = require("fs");
const ms = require("ms");
const customisation = require('../customisation.json');

const mongoose = require('mongoose');

exports.run = async (client, message, args) => {
    mongoose.connect('mongodb://localhost/DiscordDB', { useNewUrlParser: true });
    let user = message.mentions.users.first();
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("❌**Error:** You don't have the **Kick Members** permission!");
    if (message.mentions.users.size < 1) return message.reply('You must mention someone to clear their warn them.').catch(console.error);
    if(args[1] !== "all" && args[1] !== "one") return message.channel.send("Usage: clearwarn @mention all|one (warnID)")
  
const Warn = require('../models/warn.js');
    Warn.find({
      userID: user.id,
      serverID: message.guild.id,
    }, (err, warn) => {
      if (err) console.error(err);
      if (!warn) {
        message.channel.send(`This user doesn\'t have any warnings:wink:`)
      }else{
        if(args[1] == "one"){
          if(!args[2]) return message.reply("Please provide a WarnID")
          var MongoClient = require('mongodb').MongoClient;
          var url = "mongodb://localhost:27017/";
          
          MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("DiscordDB");
            var myquery = { 
              userID: user.id,
              serverID: message.guild.id,
              warnid: args[2] 
            };
            dbo.collection("warns").deleteOne(myquery, function(err, obj) {
              if (err){ 
                message.channel.send("Error: ",err)
                throw err
              };
              message.channel.send("Warning with ID: `" + args[2] + "` have been cleared from this user!")
              db.close();
            });
          });
        }else if(args[1] == "all"){
          var MongoClient = require('mongodb').MongoClient;
          var url = "mongodb://localhost:27017/";
          MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("DiscordDB");
            var myquery = { 
              userID: user.id,
              serverID: message.guild.id 
            };
            dbo.collection("warns").deleteMany(myquery, function(err, obj) {
              if (err){ 
                message.channel.send("Error: ",err)
                throw err
              };
              message.channel.send(obj.result.n + " warn(s) have been cleared from this user!");
              db.close();
            });
          });
      }
    }
      });
    
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'clearwarn',
  description: 'clear a warn from the mentioned user.',
  usage: 'clearwarn [mention] [reason]'
};
