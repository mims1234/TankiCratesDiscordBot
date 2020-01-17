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
            WeeklyID = player.id
            WeeklyUserName = player.user.username
            WeeklyIcon = player.user.avatarURL
    }
    else{
            WeeklyID = message.author.id
            WeeklyUserName = message.author.username
            WeeklyIcon = message.member.user.avatarURL
    }
    
    spaminterval = 5
    let Suser = message.author
    if (Suser.Weekly) {
        if (new Date().getTime() - Suser.Weekly < spaminterval*1000) {
            spams(message,Suser.Weekly,spaminterval)
            return;
        }
        else { Suser.Weekly = new Date().getTime()}
    }
    else { Suser.Weekly = new Date().getTime()}

    data = await DBidle.fetch(`TC_${UserID}`)
    UserWeekly = await DBidle.fetch(`TC_${UserID}`,{target: `.Weekly`})
    if(UserWeekly != moment().startOf('week').format(`L`))
    {
        DATA_DATE = moment().startOf('week').format(`L`)
        VALUE = 50

        await DBidle.set(`TC_${UserID}`,DATA_DATE,{target: `.Weekly`})
        await DBprofile.add(`TC_${WeeklyID}`,VALUE,{target: `.containers`})

        if(player) text = `*You gave ${WeeklyUserName} your weekly reward ,* \`${VALUE} Containers\` *added to his profile!*` 
        else text = `*You got* \`${VALUE} Containers\` *added to your profile!*` 
        HEX = `#00a34f`
        EMBED(text,HEX)
    }
    else
    {
        //DAILY_STREAK = await DBidle.fetch(`TC_${UserID}`,{target: `.DailyStreak`})
        text = `*You have already collected your weekly reward !*`
        HEX = `#660101`
        EMBED(text,HEX)
    }


    function EMBED(text,HEX)
    {
        textTitle = `Weekly Reward`
        let WeeklyEmbed = new Discord.RichEmbed()
        .setAuthor(UserName ,UserNameIcon)
        .addField(textTitle,`${text}`)
        .setFooter(`Next reward is ${moment().endOf(`week`).fromNow()}`)
        .setColor(HEX)
    
        message.channel.send(WeeklyEmbed)
    }

}
module.exports.help = {
    name : "weekly",
    desc : "Redeem your Weekly Reward",
    aliases: "week"
}