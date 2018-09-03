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
    }  else if ( message.content === process.env.PREFIX + " who is better, jake or chris?"){ 
        request("https://us.api.battle.net/wow/character/bleeding-hollow/Banquish?fields=items,progression,quests&apikey=" + apiKey, function (error, response, body1) {
            var jake = JSON.parse(body1);
            request("https://us.api.battle.net/wow/character/malganis/chuckjohnson?fields=items,progression,quests&apikey=" + apiKey, function (error, response, body2) {
                var chris = JSON.parse(body2);
                console.log(chris);
                console.log(jake);
                var chrisILvl = chris.items.averageItemLevel;
                var jakeILvl = jake.items.averageItemLevel;
                if (chrisILvl > jakeILvl){
                    var better = chrisILvl - jakeILvl;
                    message.channel.send("Chris has " + better + " more item level than Jake so definitely gotta go with Chris on this one.");
                } else {
                    var better = jakeILvl- chrisILvl;
                    message.channel.send("Jake has " + better + " more item level than Chris so definitely gotta go with Chris on this one.");
                }
            });
        });
    }

});

 

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_KEY);//where BOT_TOKEN is the token of our bot
