const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");
const moment = require("moment")

module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle) => {

    if(message.author.id != '292675388180791297') return

    let container = JSON.parse(fs.readFileSync("Database/DB_ContainerDrops.json","utf8"));
    ID = '264945140525694977'
//
    await DBprofile.set(`TC_${ID}`,1,{target:`.prestige`})
    await DBprofile.set(`TC_${ID}`,5000,{target:`.score`})
}
module.exports.help = {
    name : "resetPrestige"
}