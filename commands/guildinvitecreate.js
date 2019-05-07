exports.run = (client, message, args) =>{
    let guild = client.guilds.get(args[0]);
    if (!args[0]) return message.reply("Please provide a guild ID")
if (!guild) return message.reply("The bot isn't in the guild with this ID.");

let invitechannels = guild.channels.filter(c=> c.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE'))
if(!invitechannels) return message.channel.send('No Channels found with permissions to create Invite in!')

invitechannels.random().createInvite()
    .catch(e => {
      if (e) return message.channel.send(`Error to create invite: ${e}`)
    })
   .then(invite=> message.channel.send('Found Invite:\n https://discord.gg/' + invite.code))
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["getinvite"],
    permLevel: 5
  };
  
  exports.help = {
    name: 'guildinvitecreate',
    description: 'Create an invite for a server that you\'re not in',
    usage: 'guildinvitecreate <guildid>'
  };
  