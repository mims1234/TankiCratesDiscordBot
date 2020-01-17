const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");
const moment = require("moment")

module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift,DBserver) => {

    if(message.author.id != '292675388180791297') return
    A = await DBgift.startsWith(`TC`,{target:`.data`}).then(resp=>{
        for(a in resp)
        {
            console.log(resp[a].data.username)
        }
    })
  
    message.channel.send('Gift DB Check Complete !!')
    
}
module.exports.help = {
    name : "123DBcheck"
}