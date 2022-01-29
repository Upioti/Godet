const config = require("../config.json");
const Discord = require("discord.js");
module.exports = {
  name: "shop", 
  aliases: ["store"], 
  usage: " ", 
  cooldown: 2, 
  guildOnly: false, 
  admin: false, 
  async execute(message, args, client) {    
      let prefix = config.prefix
	  
    console.log(`${message.author.tag} >> ${config.prefix}shop`)
    const embed = new Discord.MessageEmbed()
		.setColor(`${config.color}`)
		.setTitle(`Support the server!`)
		.setThumbnail(`${config.logo}`)
		.setDescription(`You can visit our Store here: \n\n **${config.shop}**`)
		.setFooter(`${config.serverip}`, `${config.logo}`)
    message.channel.send(embed)
  }
};