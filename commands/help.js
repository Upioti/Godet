const config = require("../config.json");
const Discord = require("discord.js");
module.exports = {
  name: "help", 
  aliases: ["h"], 
  usage: " ", 
  cooldown: 2, 
  guildOnly: false, 
  admin: false, 
  async execute(message, args, client) {    
      let prefix = config.prefix
    
    console.log(`${message.author.tag} >> ${config.prefix}help`)
    const embed = new Discord.MessageEmbed()
	.setColor(`${config.color}`)
    .setTitle(`${message.author.tag} | Help menu:`)
	.setThumbnail(`${config.logo}`)
    .setDescription('My prefix is: `'+`${config.prefix}`+'`')
    .addField(`Here are the commands:`, `${prefix}help - This will show you every command i have!\n${prefix}ban - This will ban a certain member from the server \n${prefix}unban - This will unban a certain member from the server\n${prefix}kick - This will kick someone from the server\n${prefix}lock - Locks a channel so no one can talk\n${prefix}unlock - Unlocks a channel so people can talk again\n${prefix}nuke - This will delete all the messages in a channel\n ${prefix}gstart - Create a giveaway! \n${prefix}ip - Server ip so you can play! \n${prefix}shop - The link to our shop! \n${prefix}stats - Check how is the server going!`)
    .setFooter(`IP: ${config.serverip}`, config.logo)
    message.channel.send(embed)
  }
};
