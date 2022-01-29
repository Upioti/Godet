const config = require("../config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
module.exports = {
  name: "unban", 
  aliases: ["unbm"], 
  usage: "<user>", 
  cooldown: 0, 
  guildOnly: false, 
  admin: false, 
  async execute(message, args, client) {    
      let prefix = config.prefix

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("[ERROR] >> You dont have permission to use that!");
            if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("[ERROR] >> I dont have permissions to do that");
            if (!args[0]) return message.channel.send(`Usage: ${config.prefix}unban 777643768266489906`)
				
			let unbanMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
                 if (unbanMember === message.member) return message.channel.send("[ERROR] >> You are not banned?")

            var reason = args.slice(1).join(" ");

            try {
				let userID = args[0]
					message.guild.fetchBans().then(bans=> {
					if(bans.size == 0) return message.channel.send(`[ERROR] >> User is not banned`)
					let unbanMember = bans.find(b => b.user.id == userID)
					if(!unbanMember) return
					message.guild.members.unban(unbanMember.user)
					var sembed = new Discord.MessageEmbed()
						.setColor("GREEN")
						.setTitle("Member unbanned!")
						.setThumbnail("https://i.imgur.com/qrYPPFH.gif")
						.setDescription(`\n**Member:** ${unbanMember.user.username} \n\n**Staff User**: ${message.member}`)
						.setFooter(`IP: ${config.serverip}`, `${config.logo}`)
					message.channel.send(sembed)
					console.log(`${message.author.tag} >> ${config.prefix}unban ${unbanMember.user.username} ${reason}`)
				});
			} catch {
				let userID = args[0]
					message.guild.fetchBans().then(bans=> {
					if(bans.size == 0) return message.channel.send(`[ERROR] >> User is not banned`)
					let unbanMember = bans.find(b => b.user.id == userID)
					if(!unbanMember) return
					message.guild.members.unban(unbanMember.user)
					var sembed = new Discord.MessageEmbed()
						.setColor("GREEN")
						.setTitle("Member was unbanned!")
						.setThumbnail("https://i.imgur.com/qrYPPFH.gif")
						.setDescription(`\n**Member:** ${unbanMember.user.username} \n\n**Staff User**: ${message.member}`)
						.setFooter(`IP: ${config.serverip}`, `${config.logo}`)
					message.channel.send(sembed)
					console.log(`Unbanned ${unbanMember.user.username}`)
				});
			}
  }}