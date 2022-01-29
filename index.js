const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  disabledEvents: ["TYPING_START"]
});
const http = require("http");
const express = require("express");
const app = express();
const fs = require("graceful-fs");
const config = require("./config.json");
const fetch = require('node-fetch')
const { GiveawaysManager } = require('discord-giveaways');



client.on("ready", async () => {
  client.user.setActivity(`🎨 ${config.serverip} `, {
    type: "PLAYING",
  });
  console.log(` ▄▄ •       ·▄▄▄▄  ▄▄▄ .▄▄▄▄▄`),
  console.log(`▐█ ▀ ▪▪     ██▪ ██ ▀▄.▀·•██  `),
  console.log(`▄█ ▀█▄ ▄█▀▄ ▐█· ▐█▌▐▀▀▪▄ ▐█.▪`),
  console.log(`▐█▄▪▐█▐█▌.▐▌██. ██ ▐█▄▄▌ ▐█▌·`),
  console.log(`·▀▀▀▀  ▀█▄▀▪▀▀▀▀▀•  ▀▀▀  ▀▀▀ `),
  console.log(`         Version: 0.9.1`),
  console.log(``),  
  console.log(``),  
  console.log(`Username: ${client.user.tag}`),
  console.log(`Prefix: ${config.prefix}`),
  console.log(``),
  console.log(`---------- [Server] ----------`),
  console.log(`Server IP: ${config.serverip}`),
  console.log(`Server Shop: ${config.shop}`),
  console.log(`------------------------------`),
  console.log(``),
  console.log(`---------- [Waiting] ----------`),
  console.log(`To see the Changelog use ${config.prefix}changelog`),




client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 3000,
    default: {
        botsCanWin: false,
        embedColor: `${config.color}`,
        reaction: "🎉"
    }
});

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();



client.on("message", message => {
  let prefix = config.prefix; 
 
    
  if (message.content.indexOf(prefix) !== 0) return;
  
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  if (message.channel.type !== "text") {
    return message.reply("[ERROR] >> Please dont use commands on direct messages");
  }

  if (command.admin && !config.administrators.includes(message.author.id)) {
    return message.reply("[ERROR] >> You Need to be a bot admin");
  }
  if (command.args && !args.length) {
    let reply = `[ERROR] >> This command needs to use arguments`;

    if (command.usage) {
      reply += `\n[ERROR] >> Usage: ${prefix}${command.name} ${command.usage}`;
    }

    return message.channel.send(reply);
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `Cooldown! >> Please wait ${timeLeft.toFixed(
          1
        )} more second (s) to use \`${command.name}\` again!`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.reply("[ERROR] >> Something bad happened");
  }
})
});

client.login(config.token);