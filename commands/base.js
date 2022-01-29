const config = require("../config.json");
const Discord = require("discord.js");
module.exports = {
  name: "example", 
  aliases: ["base"], 
  usage: " ", 
  cooldown: 2, 
  guildOnly: false, 
  admin: true, 
  async execute(message, args, client) {    
      let prefix = config.prefix
    
    
    const embed = new Discord.MessageEmbed()
	.setColor(`${config.color}`)
	.setTitle("Here goes your title!")
	.setThumbnail(`${config.logo}`)
	.setDescription("Here goes your text (\n) to go on another line  1 \n 2 \n 3 \n 4")
	.setFooter(`${config.serverip}`, `${config.logo}`)
    message.channel.send(embed)
	console.log(`${message.author.tag} >> ${config.prefix}Command-name`)
  }
};