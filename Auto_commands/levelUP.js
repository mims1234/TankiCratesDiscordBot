const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");


module.exports = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle) => {
    
    let Suser = message.author
    let spaminterval =2
        if (Suser.LevelCheck) {
            if (new Date().getTime() - Suser.LevelCheck < spaminterval*1000) {
                //spams(message,Suser.LevelCheck,spaminterval)
                return;
            }
            else { Suser.LevelCheck = new Date().getTime()}
        }
        else { Suser.LevelCheck = new Date().getTime()}
        
    LevelUserName = message.author.username
    LevelUserIDs = message.author.id
    let SCORE = await DBprofile.fetch(`TC_${LevelUserIDs}`,{target: `.score`})
    let LEVEL = await DBlevel.fetch(`TC_${LevelUserIDs}`,{target: `.level`}) + 1
    let VAL = LEVEL * LEVEL * 5;
    let CRY = VAL * 10;
    //console.log(SCORE+' '+LEVEL+' '+VAL)
    if(SCORE > VAL)
    {
        await DBlevel.add(`TC_${LevelUserIDs}`,1,{target: `.level`})
        await DBprofile.add(`TC_${LevelUserIDs}`,CRY,{target: `.crystals`})

        CRY = numberFormatter("#,##0.##", CRY);
        let LEVELEMBED = new Discord.RichEmbed()
        .setAuthor('LEVEL UP')
        .setColor('#49d7ff')
        .addField(`Congratulations ${LevelUserName} ,You have levelled up!!`,`**You got +${CRY} Crystals**`)
        .setFooter(`Level ${LEVEL}`)

        setTimeout(function(){
            spaminterval = 5;
            message.channel.send(LEVELEMBED)
        }, 2000);
    }

}