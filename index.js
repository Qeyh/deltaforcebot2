const Discord = require('discord.js');
const {prefix, token} = require('./config.json');
const client = new Discord.Client();

const fs = require('fs');
client.list = require('./list.json');
let lists = require('./list.json');
let finalLists = require("./finalList.json");

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', msg => {
    if (msg.author.bot) return;

    let messageArray = msg.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(msg.content.startsWith(`${prefix}martyn`)) {
        msg.channel.send("You want some coca cola bruv? :beer:");
    }
    
    if(cmd === `${prefix}help`) {
        const helpEmbed = new Discord.RichEmbed()
        .setTitle("All the commands!")
        .setFooter("This discord bot was made by CO Psycho")
        .setColor("green")
        .setTimestamp()
        .addField("!add {name}", "Add a name to the list. _RO+_")
        .addField("!showlist", "Show all the current people on the list. _RO+_")
        .addField("!remove {name}", "Remove someone from the list. _RO+_")
        .addField("!clear", "Clear the whole list. _XO+_")
        .addField("!finalAdd", "Add someone to the final list. _XO+_")
        .addField("!finalRemove", "Remove someone from the final list. _XO+_")
        .addField("!finalList", "Show the final list of people who needs to get a tryout. _RO+_")
        .addField("!finalClear", "Clear the final list. _XO+_");
        msg.channel.send(helpEmbed);
        return;
    }

    if(msg.member.roles.some(role => role.name === "Delta Force Officer") || msg.member.roles.some(role => role.name === "Delta Force High Command")) {
        if(cmd === `${prefix}add`) {
            if(!args.length) {
                msg.channel.send("name?");
            } else {
                lists.names.push({"name": args[0], "value": ""});
                fs.writeFile ('./list.json', JSON.stringify (client.list, null, 4), (err) => {
                    if(err) throw err;
                    msg.channel.send(`**${args[0]}** has been added successfully. Check !showlist to see.`);
                });
            }
        }
        if(cmd === `${prefix}showlist`) {
            if(lists.names.length>0) {
                msg.channel.send("**This list can take up 10 seconds to write all the names.**");
                for(let i=0;i<lists.names.length;i++) {
                    msg.channel.send(`**${lists.names[i].name}**`);
                }
            } else {
                msg.channel.send("**There are no names**");
            }
        }
        if(cmd === `${prefix}finalList`) {
            if(finalLists.names.length>0) {
                msg.channel.send("**This list can take up 10 seconds to write all the names.**");
                for(let i=0;i<finalLists.names.length;i++) {
                    msg.channel.send(`**${finalLists.names[i].name}**`);
                }
            } else {
                msg.channel.send("**There are no names**");
            }
        }

        if(cmd === `${prefix}remove`) {
            if(lists.names.length>0) {
                let _name = args[0];
                for(let i=0;i<lists.names.length;i++) {
                    if(_name == lists.names[i].name) {
                        lists.names.splice(i, 1);
                        fs.writeFile ('./list.json', JSON.stringify (client.list, null, 4), (err) => {
                            if(err) throw err;
                            msg.channel.send("**The name have been deleted successfully. Check !showlist to see.**");
                        });  
                    } else {
                        msg.channel.send("**Make sure you check the right name. Lower/Upper cases are sensitive. !showList**");
                    }
                }
            } 
        }
    }
    
    if(msg.member.roles.some(role => role.name === "Delta Force High Command")) {
        if(cmd === `${prefix}clear`) {
            if(lists.names.length>0) {
                lists.names = [];
                fs.writeFile ('./list.json', JSON.stringify (client.list, null, 4), (err) => {
                    if(err) throw err;
                    msg.channel.send("**All the names have been cleared.**");
                }); 
            } 
        }

        if(cmd === `${prefix}finalClear`) {
            if(finalLists.names.length>0) {
                finalLists.names = [];
                fs.writeFile ('./finalList.json', JSON.stringify (client.list, null, 4), (err) => {
                    if(err) throw err;
                    msg.channel.send("**All the names have been cleared.**");
                }); 
            } 
        }

        if(cmd === `${prefix}finalAdd`) {
            if(!args.length) {
                msg.channel.send("name?");
            } else {
                finalLists.names.push({"name": args[0], "value": ""});
                fs.writeFile ('./finalList.json', JSON.stringify (client.list, null, 4), (err) => {
                    if(err) throw err;
                    msg.channel.send(`**${args[0]}** has been added successfully. Check !finalList to see.`);
                });
            }
        }

        if(cmd === `${prefix}finalRemove`) {
            if(finalLists.names.length>0) {
                let _name = args[0];
                for(let i=0;i<finalLists.names.length;i++) {
                    if(_name == finalLists.names[i].name) {
                        finalLists.names.splice(i, 1);
                        fs.writeFile ('./finalList.json', JSON.stringify (client.list, null, 4), (err) => {
                            if(err) throw err;
                            msg.channel.send("**The name have been deleted successfully. Check !finalList to see.**");
                        });  
                    } else {
                        msg.channel.send("**Make sure you check the right name. Lower/Upper cases are sensitive. !finalList**");
                    }
                }
            } 
        }
    }

});

client.login(process.env.BOT_TOKEN);