const Discord = require("discord.js");
const fs = require("fs");
const customisation = require('../customisation.json');

exports.run = async (client, message, args, prefix) => {
  let selfrole = JSON.parse(fs.readFileSync("./selfrole.json", "utf8"));
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`:facepalm: You can't do that BOIII! :facepalm:`);
  if(!args.join(" ") || args[0 == "help"]) return message.reply(`Usage: [p]selfrole role1,role2,... ([p] is the bot's prefix); [p]selfrole clear (to clear the selfrole list)`);
  if(args[0] === "clear") {
    

    selfrole[message.guild.id] = {
      selfrole: null
  };
  await fs.writeFile("./selfrole.json", JSON.stringify(selfrole), (err) =>{
    if (err) console.log(err)
  });
  message.reply("Self-assignable roles list has now been cleared!")
  return;
  }

  
  if(args[0] != "list"){
  srole = args[0].split(',')
  let allowedString = ''
  fsrole = ''
  srole.forEach((role) => {
  let rsrole = message.guild.roles.find('name', role);
  if (!rsrole){
    return message.reply(`${role} isn't a role on this Server!`)
  }else{
    let botRolePosition = message.guild.member(client.user).highestRole.position;
  let rolePosition = role.position;
  if (botRolePosition <= rolePosition) return message.channel.send(`❌**Error:** Failed to add ${role} to the selfrole list because my highest role is lower than the specified role.`);
    allowedString = allowedString.concat('- ' + role + '\n')
   
    
    fsrole = fsrole.concat(role + ',')
    

    selfrole[message.guild.id] = {
      selfrole: fsrole
  };
  fs.writeFile("./selfrole.json", JSON.stringify(selfrole), (err) =>{
    if (err) console.log(err)
  });
}
  })

  let embed = new Discord.RichEmbed()
  .setColor("#ff8200")
  .setTitle("Self-Role Added")
  .setDescription(`Self Assignable Roles: \n${allowedString}`)
  .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);

  message.channel.send({embed});
}else{
  
  if (!selfrole[message.guild.id] || selfrole[message.guild.id].selfrole === null){
    return message.reply("This server don't have any self-assignable roles!")
  }else{
  let embed = new Discord.RichEmbed()
  .setColor("#ff8200")
  .setTitle("Self-Role List")
  .setDescription(`Self Assignable Roles: \n${selfrole[message.guild.id].selfrole.split(',')}`)
  .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);

  message.channel.send({embed});
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
  name: "selfrole",
  description: "Create Self-assignable Roles",
  usage: "selfrole"
};