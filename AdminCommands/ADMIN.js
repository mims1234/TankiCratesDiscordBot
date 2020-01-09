const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");


module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle) => {

    if(message.author.id != '292675388180791297') return

    let player = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(player)
    {
        UserID = player.id
        UserName = player.user.username
    }
    else{
        UserID = message.author.id
        UserName = message.author.username
    }

    Item = args[1]
    if(!Item) return 
    Value = parseInt(args[2])
    if(!Value) return 
    switch(Item)
    {
        case "ACON": await DBprofile.add(`TC_${UserID}`,Value,{target:`.containers`})
                     message.channel.send(`${Value} containers added to ${UserName} profile`)
            break;
        case "ACRY": await DBprofile.add(`TC_${UserID}`,Value,{target:`.crystals`})
                     message.channel.send(`${Value} crystals added to ${UserName} profile`)
            break;
        case "SCON": await DBprofile.set(`TC_${UserID}`,Value,{target:`.containers`})
                     message.channel.send(`set ${Value} containers to ${UserName} profile`)
            break;
        case "SCRY": await DBprofile.set(`TC_${UserID}`,Value,{target:`.crystals`})
                     message.channel.send(`set ${Value} crystals to ${UserName} profile`)
            break;  
        case "SUCON":   Val = await DBprofile.fetch(`TC_${UserID}`,{target:`.containers`})
                        if(Value >Val) return message.channel.send('Does not have that many containers')
                        await DBprofile.subtract(`TC_${UserID}`,Value,{target:`.containers`})
                        message.channel.send(`${Value} containers removed from ${UserName} profile`)
            break;
        case "SUCRY":   Val = await DBprofile.fetch(`TC_${UserID}`,{target:`.crystals`})
                        if(Value >Val) return message.channel.send('Does not have that many crystals')
                        await DBprofile.subtract(`TC_${UserID}`,Value,{target:`.crystals`})
                        message.channel.send(`${Value} crystals removed from ${UserName} profile`)
            break;    
        case "SUCRY":   Val = await DBprofile.fetch(`TC_${UserID}`,{target:`.crystals`})
                        if(Value >Val) return message.channel.send('Does not have that many crystals')
                        await DBprofile.subtract(`TC_${UserID}`,Value,{target:`.crystals`})
                        message.channel.send(`${Value} crystals removed from ${UserName} profile`)
            break; 
        case "SUCRY":   Val = await DBprofile.fetch(`TC_${UserID}`,{target:`.crystals`})
                        if(Value >Val) return message.channel.send('Does not have that many crystals')
                        await DBprofile.subtract(`TC_${UserID}`,Value,{target:`.crystals`})
                        message.channel.send(`${Value} crystals removed from ${UserName} profile`)
            break; 
    }
}
module.exports.help = {
    name : "admin"
}