const settings = require('../settings.json');
const customisation = require('../customisation.json');
exports.run = (client, message, args) => {
  if(message.author.id !== settings.ownerid) return message.channel.send(`${message.author}, ${customisation.ownercmdfailtext}`);
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.reply("❌**Error:** I don't have the **Manage Roles** permission!");
    if (message.mentions.users.size === 0) return message.reply("❌Please mention a user to give the role to.\nExample: `owneraddrole @user Members`");
    let member = message.guild.member(message.mentions.users.first());
    if (!member) return message.reply("❌**Error:** That user does not seem valid.");
    let name = message.content.split(" ").splice(2).join(" ");
    let role = message.guild.roles.get('name', name);
    if (!role) return message.reply(`❌**Error:** ${name} isn't a role on this server!`);
    let botRolePosition = message.guild.member(client.user).highestRole.position;
    let rolePosition = role.position;
    if (botRolePosition <= rolePosition) return message.channel.send("❌**Error:** Failed to add the role to the user because my highest role is lower than the specified role.");
    member.addRole(role).catch(e => {
        return message.channel.send(`❌**Error:**\n${e}`);
    });
    message.channel.send(`<a:balancecheck:556017659419033653> **${message.author.username}**, I've added the **${name}** role from **${message.mentions.users.first().username}**.`);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ownerpromote"],
  permLevel: 0
};

exports.help = {
  name: 'owneraddrole',
  description: 'Adds a role. It\'s that simple.',
  usage: 'owneraddrole'
};
