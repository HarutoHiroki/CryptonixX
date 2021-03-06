
const settings = require('../settings.json');
const customisation = require('../customisation.json');
exports.run = (client, message, args) => {
  if(message.author.id !== settings.ownerid) return message.channel.send(`${message.author}, ${customisation.ownercmdfailtext}`);
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.reply(":no_entry_sign: **Error:** I don't have the **Manage Roles** permission!");
    if (message.mentions.users.size === 0) return message.reply(":no_entry_sign: Please mention a user to remove the role from.");
    let member = message.guild.member(message.mentions.users.first());
    if (!member) return message.reply(":no_entry_sign: **Error:** That user does not seem valid.");
    let rname = message.content.split(" ").splice(2).join(" ");
    let role = message.guild.roles.find(val => val.name === rname);
    member.removeRole(role).catch(e => {
        return message.channel.send(":no_entry_sign: There was an error! It most likely is that the role you are trying to remove is higher than the the role I have!");
    });
    message.channel.send(`<a:balancecheck:556017659419033653> **${message.author.username}**, I've removed the **${rname}** role from **${message.mentions.users.first().username}**.`);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ownerdemote"],
  permLevel: 0
};

exports.help = {
  name: 'ownerremoverole',
  description: 'Removes a role. It\'s as simple as adding a role.',
  usage: 'ownerremoverole'
};
