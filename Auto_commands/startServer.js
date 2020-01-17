const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");


module.exports= async (bot,message,args,DBserver,serveruser) => {

    StartUPServerUserID = message.author.id
    StartUPServerUserName = message.author.username
    StartUPServerID = message.guild.id
    StartUPServerName = message.guild.name
    if(!serveruser)
    { 
        let NewProfile = {
        username: `${StartUPServerUserName}`,
        id: `${StartUPServerUserID}`,
        serverid: `${StartUPServerID}`,
        score:0
        }

    await DBserver.set(`TC_${StartUPServerID}_${StartUPServerUserID}`,NewProfile);

    console.log(`${StartUPServerUserName} Server-Profile at ${StartUPServerName} Created`)
    }
}
