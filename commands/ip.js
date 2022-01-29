const config = require("../config.json");
const Discord = require("discord.js");
module.exports = {
  name: "ip", 
  aliases: ["play"], 
  usage: " ", 
  cooldown: 2, 
  guildOnly: false, 
  admin: false, 
  async execute(message, args, client) {    
      let prefix = config.prefix
    
    console.log(`${message.author.tag} >> ${config.prefix}ip`)
    const embed = new Discord.MessageEmbed()
	.setColor(`${config.color}`)
	.setTitle(`Start The Fun Now!`)
	.setThumbnail(`${config.logo}`)
	.setDescription(`Join our server right now using: **${config.serverip}** \n\n _For more information about the status do **!stats**_ `)
	.setFooter(`We are waiting for you!`, `${config.logo}`)
    message.channel.send(embed)
  }
};