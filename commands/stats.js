const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require('node-fetch');
module.exports = {
  name: "stats", 
  aliases: ["status"], 
  usage: " ", 
  cooldown: 2, 
  guildOnly: false, 
  admin: false, 
  async execute(message, args, client) {  
      let prefix = config.prefix


        const sentMessage = await message.channel.send("Connecting to the server...")

        console.log(`${message.author.tag} >> ${config.prefix}stats`)
        const res = await fetch(`https://mcapi.us/server/status?ip=${config.serverip}${config.port ? `&port=${config.port}` : ''}`)
        if (!res) return message.channel.send(`Looks like the server is offline!`)
        
        const body = await res.json()


        const embed = new Discord.MessageEmbed()
            .setThumbnail(`${config.logo}`)
            .addField("Version", body.server.name)
            .addField("Connected", `${body.players.now} players`)
            .addField("Maximum Players", `${body.players.max} players`)
            .addField("Status", (body.online ? "Online" : "Offline"))
            .setColor(`${config.color}`)
			.setFooter(`${config.serverip}`, `${config.logo}`)
        
        sentMessage.edit(`:green_square: Server IP: **${config.serverip}**`, { embed })
    }
};
