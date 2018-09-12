const Discord = require('discord.js');
const request = require('request');
require('dotenv').config(); 
const client = new Discord.Client();

var apiKey = process.env.API_KEY

client.on('ready', () => {
    console.log('I am ready!');
});

let getCharInfo = function(name,realm,players){
    return new Promise(function(resolve,reject){
        request("https://us.api.battle.net/wow/character/" + realm + "/" + name + "?fields=items,progression,quests,talents&apikey=" + apiKey, function (error, response, body) {
                if(body){
                    var obj = JSON.parse(body);
                    // console.log(body);
                    // console.log(obj);
                    // console.log(obj.name + " Item Level: " + obj.items.averageItemLevel);
                    players.push(obj);
                    resolve(players);
                } else {
                    reject(error);
                }
        });
    })
}

var races = {
    1: "Human", 2: "Orc", 3: "Dwarf", 4: "Night Elf", 5: "Undead", 6: "Tauren",
    7: "Gnome", 8: "Troll", 9: "Goblin", 10: "Blood Elf", 11: "Draenei",
    22: "Worgen", 24: "Pandaren", 25: "Ally Panda", 26: "Horde Panda",
    27: "Nightborne", 28: "Highmountain Tauren", 29: "Void Elf", 30: "Lf. Draenei", 31: "Zand. Troll",
    32: "Kul Tiran", 34: "Dark Iron Dwarf", 36: "Mag'har Orc"
}

var classes = {
    1: "Warrior", 2: "Paladin", 3: "Hunter", 4: "Rogue", 5: "Priest", 6: "Death Knight",
    7: "Shaman", 8: "Mage", 9: "Warlock", 10: "Monk", 11: "Druid", 12: "Demon Hunter"    
};

function formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return monthNames[monthIndex] + ' ' + day + ', ' + year;
  }

 

client.on('message', async message => {

    if(message.content.indexOf(process.env.PREFIX) !== 0) return;

    if(message.author.bot) return;

    //Jeff Level
    if (message.content === process.env.PREFIX + " what level is jeff?") {
        request("https://us.api.battle.net/wow/character/bleeding-hollow/Morgayne?fields=items,progression,quests&apikey=" + apiKey, function (error, response, body) {
            var obj = JSON.parse(body);
            var thumbnail = "https://render-us.worldofwarcraft.com/character/" + obj.thumbnail
            message.channel.send("Morgayne is level " + obj.level, {file: thumbnail})
        });
    //Josh Level
    } else if (message.content === process.env.PREFIX + " what level is josh?") {
        request("https://us.api.battle.net/wow/character/bleeding-hollow/Realios?fields=items,progression,quests&apikey=" + apiKey, function (error, response, body) {
            var obj = JSON.parse(body);
            var thumbnail = "https://render-us.worldofwarcraft.com/character/" + obj.thumbnail
            
            message.channel.send("Realios is level " + obj.level, {file: thumbnail})
        });
    //Chris vs Jake  
    } else if (message.content === process.env.PREFIX + " has josh resubbed?") {
        request("https://us.api.battle.net/wow/character/bleeding-hollow/Realios?fields=statistics&apikey=" + apiKey, function (error, response, body) {
            var obj = JSON.parse(body);
            var loginDate = new Date(obj.lastModified);
            var joshBack = String("No, last login was " + formatDate(loginDate)); 
            if(obj.lastModified > 1514939902000){
                joshBack = "yes! WELCOME BACK JASHOU";
            };
            
            message.channel.send(joshBack);
        });
    } else if ( message.content === process.env.PREFIX + " who is better, jake or chris?"){ 
        request("https://us.api.battle.net/wow/character/bleeding-hollow/Banquish?fields=items,progression,quests&apikey=" + apiKey, function (error, response, body1) {
            var jake = JSON.parse(body1);
            request("https://us.api.battle.net/wow/character/malganis/chuckjohnson?fields=items,progression,quests&apikey=" + apiKey, function (error, response, body2) {
                var chris = JSON.parse(body2);
                // console.log(chris);
                // console.log(jake);
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
    //Role Call
    } else if ( message.content === process.env.PREFIX + " gimme a role call"){
        var players = [];
        var i = 0;
        message.channel.send("BEEP BEEP, HERE COMES THE CREW\n\n");
        //Jake
        getCharInfo("Banquish","bleeding-hollow",players).then(function(players){
            var spec;
            players[i].talents.forEach(function(talent){
                if(talent.selected == true){
                    spec = talent.spec.name
                }
            })
            var thumbnail = "https://render-us.worldofwarcraft.com/character/" + players[i].thumbnail
            var output = players[i].name + ", The " + races[players[i].race] + " " + spec + " " + classes[players[i].class] + "\nItem Level: " + players[i].items.averageItemLevel
            message.channel.send(output, {file: thumbnail});
            return getCharInfo("Cattus","bleeding-hollow",players)
        //me
        }).then(function(players){
            i++;
            var spec;
            players[i].talents.forEach(function(talent){
                if(talent.selected == true){
                    spec = talent.spec.name
                }
            })
            var thumbnail = "https://render-us.worldofwarcraft.com/character/" + players[i].thumbnail
            var output = players[i].name + ", The " + races[players[i].race] + " " + spec + " " + classes[players[i].class] + "\nItem Level: " + players[i].items.averageItemLevel
            message.channel.send(output, {file: thumbnail});
            return getCharInfo("Mildspeaker","zuljin",players)
        //nate
        }).then(function(players){
            i++;
            var spec;
            players[i].talents.forEach(function(talent){
                if(talent.selected == true){
                    spec = talent.spec.name
                }
            })
            var thumbnail = "https://render-us.worldofwarcraft.com/character/" + players[i].thumbnail
            var output = players[i].name + ", The " + races[players[i].race] + " " + spec + " " + classes[players[i].class] + "\nItem Level: " + players[i].items.averageItemLevel
            message.channel.send(output, {file: thumbnail});
            return getCharInfo("Chuckjohnson","Malganis",players)
        //Chris
        }).then(function(players){
            i++;
            var spec;
            players[i].talents.forEach(function(talent){
                if(talent.selected == true){
                    spec = talent.spec.name
                }
            })
            var thumbnail = "https://render-us.worldofwarcraft.com/character/" + players[i].thumbnail
            var output = players[i].name + ", The " + races[players[i].race] + " " + spec + " " + classes[players[i].class] + "\nItem Level: " + players[i].items.averageItemLevel
            message.channel.send(output, {file: thumbnail});
            return getCharInfo("Thrasos","bleeding-hollow",players)
        //Dallas
        }).then(function(players){
            i++;
            var spec;
            players[i].talents.forEach(function(talent){
                if(talent.selected == true){
                    spec = talent.spec.name
                }
            })
            var thumbnail = "https://render-us.worldofwarcraft.com/character/" + players[i].thumbnail
            var output = players[i].name + ", The " + races[players[i].race] + " " + spec + " " + classes[players[i].class] + "\nItem Level: " + players[i].items.averageItemLevel
            message.channel.send(output, {file: thumbnail});
            return getCharInfo("Morgayne","bleeding-hollow",players)
        //Jeff
        }).then(function(players){
            i++;        
            var spec;
            players[i].talents.forEach(function(talent){
                if(talent.selected == true){
                    spec = talent.spec.name
                }
            })
            var thumbnail = "https://render-us.worldofwarcraft.com/character/" + players[i].thumbnail
            var output = players[i].name + ", The " + races[players[i].race] + " " + spec + " " + classes[players[i].class] + "\nCharacter Level: " + players[i].level
            message.channel.send(output, {file: thumbnail});
            return getCharInfo("Realios","bleeding-hollow",players)
        //Josh
        }).then(function(players){
            i++;
            var spec;
            players[i].talents.forEach(function(talent){
                if(talent.selected == true){
                    spec = talent.spec.name
                }
            })
            var thumbnail = "https://render-us.worldofwarcraft.com/character/" + players[i].thumbnail
            var output = players[i].name + ", The " + races[players[i].race] + " " + spec + " " + classes[players[i].class] + "\nCharacter Level: " + players[i].level
            message.channel.send(output, {file: thumbnail});
            return getCharInfo("Sinjaru","zuljin",players)
        }).then(function(players){
            i++;
            var spec;
            players[i].talents.forEach(function(talent){
                if(talent.selected == true){
                    spec = talent.spec.name
                }
            })
            var thumbnail = "https://render-us.worldofwarcraft.com/character/" + players[i].thumbnail
            var output = players[i].name + ", The " + races[players[i].race] + " " + spec + " " + classes[players[i].class] + "\nItem Level: " + players[i].items.averageItemLevel
            message.channel.send(output, {file: thumbnail});
            return getCharInfo("Realios","bleeding-zuljin",players)
        })

    }

});


 

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_KEY);//where BOT_TOKEN is the token of our bot
