const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const moment = require("moment")
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");

module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle) => {

    //if(message.author.id != '292675388180791297') return
    let prestigeData = JSON.parse(fs.readFileSync("DataBase/Prestige.json","utf8"));
    let textfile = JSON.parse(fs.readFileSync("TextFolder/TextFile.json","utf8"));
    let container = JSON.parse(fs.readFileSync("DataBase/DB_ContainerDrops.json","utf8"));
    let paintName = JSON.parse(fs.readFileSync("DataBase/DB_PaintName.json","utf8"));
    let paints = JSON.parse(fs.readFileSync("DataBase/DB_PaintID.json","utf8"));

    if(message.author.id != '292675388180791297')
    {
        spaminterval = 5
    }
    else{
        spaminterval = 0
    }
    
    spaminterval = 5
    let Suser = message.author
    if (Suser.ContinueKey) {
        if (new Date().getTime() - Suser.ContinueKey < spaminterval*1000) {
            spams(message,Suser.ContinueKey,spaminterval)
            return;
        }
        else { Suser.ContinueKey = new Date().getTime()}
    }
    else { Suser.ContinueKey = new Date().getTime()}
    
    UserID = message.author.id
    UserName = message.author.username
    UserNameIcon = message.member.user.avatarURL

    PrestigeLevel = await DBprofile.fetch(`TC_${UserID}`,{target : `.prestige`})
    PrestigeTotalPaints = await DBprofile.fetch(`TC_${UserID}`,{target : `.paints`})
    PrestigeCheck = await DBidle.fetch(`TC_${UserID}`,{target : `.Prestige`})

    PrestigeCheckFucntion = async(PrestigeLevel,TotalPaints) => {
            if(PrestigeLevel === 0 && TotalPaints >= prestigeData[`data`].p1) return `prestige1`
            if(PrestigeLevel === 1 && TotalPaints >= prestigeData[`data`].p2) return `prestige2`
            if(PrestigeLevel === 2 && TotalPaints >= prestigeData[`data`].p3) return `prestige3`
            if(PrestigeLevel === 3 && TotalPaints >= prestigeData[`data`].p4) return `prestige4`
            if(PrestigeLevel === 4 && TotalPaints >= prestigeData[`data`].p5) return `prestige5`
            return null
    }

    //if(PrestigeCheck != true)

    if(PrestigeCheck != true){
        P = await PrestigeCheckFucntion(PrestigeLevel,PrestigeTotalPaints)
        if(P != null)
        {
            message.reply(`**You have choosen to continue progress**\n*You can use \`xprestige\` at any point from now*`)
            await DBidle.set(`TC_${UserID}`,true,{target : `.Prestige`})
        }
        else console.log('Igrnored Prestige')
    }   
    else return

}
module.exports.help = {
    name : "continue",
}