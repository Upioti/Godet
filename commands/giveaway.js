const config = require("../config.json");
const Discord = require("discord.js");
const ms = require('ms');
module.exports = {
  name: "giveaway", 
  aliases: ["gstart"], 
  usage: " ", 
  cooldown: 2, 
  guildOnly: false, 
  admin: false, 
  async execute(message, args, client) {    
      let prefix = config.prefix
            if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`:boom: You need to have the **MANAGE_MESSAGES** permission to start giveaways.`);
        
		
		let giveawayChannel = message.mentions.channels.first();
        if (!giveawayChannel) {
            return message.channel.send(':boom: Usage: !gstart #channel (time s/m/h/d) (winners) (prize name)');
        }

        let giveawayDuration = args[1];
        if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
            return message.channel.send(':boom: Usage: !gstart #channel (time s/m/h/d) (winners) (prize name)');
        }

        let giveawayNumberWinners = args[2];
        if (isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) {
            return message.channel.send(':boom: Usage: !gstart #channel (time s/m/h/d) (winners) (prize name)');
        }

        let giveawayPrize = args.slice(3).join(' ');
        if (!giveawayPrize) {
            return message.channel.send(':boom: Usage: !gstart #channel (time s/m/h/d) (winners) (prize name)');
        }
		console.log(`${message.author.tag} >> ${config.prefix}giveaway ${giveawayChannel} ${giveawayDuration} ${giveawayNumberWinners} ${giveawayPrize}`)
        client.giveawaysManager.start(giveawayChannel, {
            time: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: parseInt(giveawayNumberWinners),
            hostedBy: (message.author),
            messages: {
				giveaway: ":tada: **GIVEAWAY** :tada: ||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| @everyone",
				giveawayEnded: ":tada: **GIVEAWAY ENDED** :tada:",
                timeRemaining: "Time remaining: **{duration}**!",
                inviteToParticipate: "React with 🎉 to participate!",
                winMessage: "Congratulations, {winners}! You won the **{prize}**!",
                embedFooter: `${config.serverip}`,
                noWinner: "No one entered the giveaway!",
                hostedBy: "Hosted by: {user}",
             	winners: "winner(s)",
                endedAt: "Ended at",
                units: {
					seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false
                }
            }
        });
    }
};