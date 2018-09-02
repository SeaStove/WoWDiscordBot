const Discord = require('discord.js');
const request = require('request');
require('dotenv').config(); 
const client = new Discord.Client();

var apiKey = process.env.API_KEY

client.on('ready', () => {
    console.log('I am ready!');
});


 

client.on('message', async message => {

    if(message.content.indexOf(process.env.PREFIX) !== 0) return;

    if(message.author.bot) return;

    if (message.content === process.env.PREFIX + "jefflevel") {
        request("https://us.api.battle.net/wow/character/bleeding-hollow/Morgayne?fields=items,progression,quests&apikey=" + apiKey, function (error, response, body) {
            var obj = JSON.parse(body);
            message.channel.send("Morgayne is level " + obj.level)
        });
        
        // message.reply("stop");
    } else { 
        message.reply("Message I'm lookin for: " + process.env.PREFIX + "jefflevel");
    }

});

 

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_KEY);//where BOT_TOKEN is the token of our bot
