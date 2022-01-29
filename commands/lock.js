const config = require("../config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
module.exports = {
  name: "lock", 
  aliases: ["clock"], 
  usage: " ", 
  cooldown: 0, 
  guildOnly: false, 
  admin: false, 
  async execute(message, args, client) {    
      let prefix = config.prefix
      
   if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("[ERROR] >> You dont have permission to do that");

     const type = message.channel.type === 'text' ? 'SEND_MESSAGES' : 'CONNECT';
message.channel.overwritePermissions([
  {
     id: message.guild.roles.everyone,
     deny: ['SEND_MESSAGES', 'ADD_REACTIONS'],
  },
]);
	console.log(`${message.author.tag} >> ${config.prefix}lock (Channel locked: ${message.channel.name} )`)
    return message.channel.send(`**CHANNEL LOCKED** \nLocked by: <@${message.author.id}>`)

  
  
  
  }
}