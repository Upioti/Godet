const config = require("../config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
module.exports = {
  name: "unlock", 
  aliases: ["talk"], 
  usage: " ", 
  cooldown: 0, 
  guildOnly: false, 
  admin: false, 
  async execute(message, args, client) {    
      let prefix = config.prefix
      
   if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("[ERROR] >> You dont have permission");

     const type = message.channel.type === 'text' ? 'SEND_MESSAGES' : 'CONNECT';
message.channel.overwritePermissions([
  {
     id: message.guild.roles.everyone,
     allow: ['SEND_MESSAGES', 'ADD_REACTIONS'],
  },
]);
	console.log(`${message.author.tag} >> ${config.prefix}unlock (Channel unlocked: ${message.channel.name})`)
    return message.channel.send(`**CHANNEL UNLOCKED** \nUnlocked by: <@${message.author.id}>`)

  
  
  
  
  }
}