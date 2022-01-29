const config = require("../config.json");
const Discord = require("discord.js");
module.exports = {
  name: "changelog", 
  aliases: ["update"], 
  usage: " ", 
  cooldown: 2, 
  guildOnly: false, 
  admin: true, 
  async execute(message, args, client) {    
      let prefix = config.prefix
    
    
    const embed = new Discord.MessageEmbed()
	.setColor(`${config.color}`)
	.setTitle("Changelog for version 0.9.1")
	.setThumbnail(`${config.logo}`)
	.setDescription("HOTFIX - 0.9.1 \n - Fixed Giveaway Embed Color Not Working \n - Added Changelog Command (This one lol) \n - Changed some messages that were oudated")
	.setFooter(`${config.serverip}`, `${config.logo}`)
    message.channel.send(embed)
	console.log(`${message.author.tag} >> ${config.prefix}changelog`)
  }
};