const Discord = require('discord.js');
const request = require('request');

const client = new Discord.Client();

var apiKey = process.env.BOT_KEY
require('dotenv').config(); 

client.on('ready', () => {

    console.log('I am ready!');
	console.log('process.env.PREFIX');
});


 

client.on('message', async message => {

    if(message.content.indexOf(process.env.PREFIX) !== 0) return;

    if(message.author.bot) return;

    if (message.content === process.env.prefix + "jefflevel") {
        request("https://us.api.battle.net/wow/character/bleeding-hollow/Morgayne?fields=items,progression,quests&apikey=" + apiKey, function (error, response, body) {

            var obj = JSON.parse(body);
            message.channel.send("Morgayne is level " + obj.level)
        });
        
        // message.reply("stop");
    }

    if(message.content === process.env.prefix + "ping"){
        message.reply("pong");
    }

    // message.reply("Message I'm lookin for: " + process.env.prefix + "ping");

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_KEY);//where BOT_TOKEN is the token of our bot
