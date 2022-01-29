const config = require("../config.json");
const Discord = require("discord.js");
module.exports = {
  name: "nuke", 
  aliases: ["del"], 
  usage: " ", 
  cooldown: 2, 
  guildOnly: false, 
  admin: false, 
  async execute(message, args, client) {    
  
      let prefix = config.prefix
	  function sleep(ms) {
	  return new Promise(resolve => setTimeout(resolve, ms));
		}
	  {
	        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
				return message.channel.send('[ERROR] >> You dont have permission')
			}
				message.channel.clone().then(channel => {
				console.log(`${message.author.tag} >> ${config.prefix}nuke (Channel Nuked: ${message.channel.name})`)
				channel.setPosition(message.channel.position)
				channel.send('This channel has been nuked :radioactive:') 
				channel.send('https://media1.tenor.com/images/4443d426a6007f7826e635d225113696/tenor.gif?itemid=13271717')
			})
				sleep(150).then(() => {message.channel.delete(); });
	        }
    }
};