const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");


module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift,DBserver) => {

    if(message.author.id != '292675388180791297') return

    UserID = message.author.id

    //await DBprofile.subtract(`TC_${UserID}`,1,{target:`.totalC`})
    //await DBprofile.subtract(`TC_${UserID}`,1,{target:`.paints`})
    //message.channel.send(`Executed`)
}
module.exports.help = {
    name : "file1"
}