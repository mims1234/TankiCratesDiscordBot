const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const moment = require("moment")
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");

module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift,DBserver) => {

    //if(message.author.id != '292675388180791297') return
    if(message.author.id != '292675388180791297')
    {
        spaminterval = 5
    }
    else{
        spaminterval = 0
    }
    
    UserID = message.author.id
    UserName = message.author.username
    UserNameIcon = message.member.user.avatarURL
    
    let player = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(player)
    {
            DailyID = player.id
            DailyUserName = player.user.username
            DailyIcon = player.user.avatarURL
    }
    else{
            DailyID = message.author.id
            DailyUserName = message.author.username
            DailyIcon = message.member.user.avatarURL
    }
    
    spaminterval = 5
    let Suser = message.author
    if (Suser.Daily) {
        if (new Date().getTime() - Suser.Daily < spaminterval*1000) {
            spams(message,Suser.Daily,spaminterval)
            return;
        }
        else { Suser.Daily = new Date().getTime()}
    }
    else { Suser.Daily = new Date().getTime()}

    UserDaily = await DBidle.fetch(`TC_${UserID}`,{target: `.Daily`})
    if(UserDaily != moment().format(`L`))
    {
        //DAILY_STREAK = await DBidle.fetch(`TC_${UserID}`,{target: `.DailyStreak`})
        DATA_DATE = moment().format(`L`)
        VALUE = 15

        await DBidle.set(`TC_${UserID}`,DATA_DATE,{target: `.Daily`})
        //await DBidle.add(`TC_${DailyID}`,1,{target: `.DailyStreak`})

        await DBprofile.add(`TC_${DailyID}`,VALUE,{target: `.containers`})

        if(player) text = `*You gave ${DailyUserName} your daily reward ,* \`${VALUE} Containers\` *added to his profile!*` 
        else text = `*You got* \`${VALUE} Containers\` *added to your profile!*` 
        HEX = `#00a34f`
        EMBED(text,HEX)
    }
    else
    {
        //DAILY_STREAK = await DBidle.fetch(`TC_${UserID}`,{target: `.DailyStreak`})
        text = `*You have already collected your daily reward !*`
        HEX = `#660101`
        EMBED(text,HEX)
    }


    function EMBED(text,HEX)
    {
        textTitle = `Daily Reward`
        let DailyEmbed = new Discord.RichEmbed()
        .setAuthor(UserName ,UserNameIcon)
        .addField(textTitle,`${text}`)
        .setFooter(`Next reward is ${moment().endOf(`day`).fromNow()}`)
        .setColor(HEX)
    
        message.channel.send(DailyEmbed)
    }

}
module.exports.help = {
    name : "daily",
    desc : "Redeem your Daily Reward",
    aliases: "day"
}