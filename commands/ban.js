const config = require("../config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
module.exports = {
  name: "ban", 
  aliases: ["bm"], 
  usage: "<user>", 
  cooldown: 0, 
  guildOnly: false, 
  admin: false, 
  async execute(message, args, client) {    
      let prefix = config.prefix
	  function sleep(milliseconds) {
		const date = Date.now();
		let currentDate = null;
		do {
			currentDate = Date.now();
		} while (currentDate - date < milliseconds);
		}
    
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("[ERROR] >> You dont have permission to use that!");
            if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("[ERROR] >> I dont have permissions to do that");
            if (!args[0]) return message.channel.send(`Usage: ${config.prefix}ban @RuleBreaker Breaking rule 5`)

            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
                 if (banMember === message.member) return message.channel.send("[ERROR] >> You cannot ban yourself")

			var reason = ("None")
            var reason = args.slice(1).join(" ");

            if (!banMember.bannable) return message.channel.send("[ERROR] >> I cannot ban this user because he has a higher rank than me!")
            try {
			message.guild.members.ban(banMember)
			console.log(`${message.author.tag} >> ${config.prefix}ban ${banMember.user.username} ${reason}`).catch(() => null)
            } catch {
				message.guild.members.ban(banMember)
				
            }
            if (reason) {
            var sembed = new Discord.MessageEmbed()
                .setColor("RED")
				.setTitle("Member was banned!")
				.setThumbnail("https://i.imgur.com/qrYPPFH.gif")
                .setDescription(`\n**Banned Member:** ${banMember.user.username} \n\n**Staff User**: ${message.member}  \n\n **Reason:** ${reason}\n`)
				.setFooter(`IP: ${config.serverip}`, `${config.logo}`)
            message.channel.send(sembed)
            } else {
                var sembed2 = new Discord.MessageEmbed()
                .setColor("RED")
				.setTitle("Member was banned!")
				.setThumbnail("https://i.imgur.com/qrYPPFH.gif")
                .setDescription(`\n**Banned Member:** ${banMember.user.username} \n\n**Staff User**: ${message.member}  \n\n **Reason:** No reason was provided\n`)
				.setFooter(`IP: ${config.serverip}`, `${config.logo}`)
            message.channel.send(sembed2)
            }
  }}