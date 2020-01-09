const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");


module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle) => {

    if(message.author.id != '292675388180791297')
    {
        return //if(message.author.id != '443649136881827850') return
    }

    UserID = '378201035409457152' //message.author.id
    NewL = {}
    console.log('Step-1')
    data = await DBprofile.fetch(`TC_${UserID}`)
    console.log(data.Paints.C)
    NewLObject = Object.keys(data.Paints.C)
    console.log(NewLObject.length)
    for(a in NewLObject)
    {
        if(NewLObject[a]!="19TOP468") NewL[`${NewLObject[a]}`] = true
    }

    console.log('Step-2')
    await DBprofile.set(`TC_${UserID}`,NewL,{target:`.Paints.C`})
    data = await DBprofile.fetch(`TC_${UserID}`)
    NewLObject = Object.keys(data.Paints.C)
    console.log(data.Paints.C)
    console.log(NewLObject.length)

}
module.exports.help = {
    name : "21313fixDB"
}