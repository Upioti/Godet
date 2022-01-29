const config = require("../config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
module.exports = {
  name: "kick", 
  aliases: ["km"], 
  usage: "<user>", 
  cooldown: 0, 
  guildOnly: false, 
  admin: false, 
  async execute(message, args, client) {    
      let prefix = config.prefix
    
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("[ERROR] >> You dont have permission to use that!");
            if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("[ERROR] >> I dont have permission to do that");
            if (!args[0]) return message.channel.send(`Usage: ${config.prefix}kick @RuleBreaker Breaking rule 2`)

            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
                 if (banMember === message.member) return message.channel.send("[ERROR] >> You cannot kick yourself")

			var reason = ("None")
            var reason = args.slice(1).join(" ");

            if (!banMember.kickable) return message.channel.send("[ERROR] >> I cannot ban this user because he has a higher rank than me!")
            try {				
			banMember.kick()
			console.log(`${message.author.tag} >> ${config.prefix}kick ${banMember.user.username} ${reason}`).catch(() => null)
            } catch {
                banMember.kick()
            }
            if (reason) {
            var sembed = new Discord.MessageEmbed()
                .setColor("YELLOW")
				.setTitle("Member was kicked!")
				.setThumbnail("https://i.imgur.com/qrYPPFH.gif")
                .setDescription(`\n**Kicked Member:** ${banMember.user.username} \n\n**Staff User**: ${message.member}  \n\n **Reason:** ${reason}\n`)
				.setFooter(`IP: ${config.serverip}`, `${config.logo}`)
            message.channel.send(sembed)
            } else {
                var sembed2 = new Discord.MessageEmbed()
                .setColor("YELLOW")
				.setTitle("Member was kicked!")
				.setThumbnail("https://i.imgur.com/qrYPPFH.gif")
                .setDescription(`\n**Kicked Member:** ${banMember.user.username} \n\n**Staff User**: ${message.member}  \n\n **Reason:** No reason was provided\n`)
				.setFooter(`IP: ${config.serverip}`, `${config.logo}`)
            message.channel.send(sembed2)
            }
  }}