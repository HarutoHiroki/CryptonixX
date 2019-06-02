const settings = require('../settings.json');
exports.run = (client, message, args) => {
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.reply(":no_entry_sign: **Error:** I don't have the **Manage Roles** permission!");
    if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.reply(":no_entry_sign: **Error:** You don't have the **Manage Roles** permission!");
    if (message.mentions.users.size === 0) return message.reply(":no_entry_sign: Please mention a user to remove the role from.");
    let member = message.guild.member(message.mentions.users.first());
    if (!member) return message.reply(":no_entry_sign: **Error:** That user does not seem valid.");
    let rname = message.content.split(" ").splice(2).join(" ");
    let role = message.guild.roles.find("name", rname);
    //console.log(role)
    if (!role) return message.reply(`❌**Error:** ${rname} isn't a role on this server!`);
    let botRolePosition = message.guild.member(client.user).highestRole.position;
    let rolePosition = role.position;
    let userRolePossition = message.member.highestRole.position;
    if (userRolePossition <= rolePosition) return message.channel.send("❌**Error:** Failed to add the role to the user because your role is lower than the specified role.")
    if (botRolePosition <= rolePosition) return message.channel.send("❌**Error:** Failed to add the role to the user because my highest role is lower than the specified role.");
    member.removeRole(role).catch(e => {
        return message.channel.send(":no_entry_sign: There was an error! It most likely is that the role you are trying to remove is higher than the the role I have!");
    });
    message.channel.send(`:white_check_mark: **${message.author.username}**, I've removed the **${rname}** role from **${message.mentions.users.first().username}**.`);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["nerf"],
  permLevel: 0
};

exports.help = {
  name: 'removerole',
  description: 'Removes a role. It\'s as simple as adding a role.',
  usage: 'removerole'
};
