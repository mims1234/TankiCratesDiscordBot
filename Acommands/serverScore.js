const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const moment = require("moment")
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");

module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift,DBserver) => {

    if(message.author.id != '292675388180791297') return
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
    GuildID = `442704155644264450`
    
    let player = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(player)
    {
            GiveawayID = player.id
            GiveawayUserName = player.user.username
            GiveawayIcon = player.user.avatarURL
    }
    else{
            GiveawayID = message.author.id
            GiveawayUserName = message.author.username
            GiveawayIcon = message.member.user.avatarURL
    }
    
    spaminterval = 3
    let Suser = message.author
    if (Suser.GiveawaySpam) {
        if (new Date().getTime() - Suser.GiveawaySpam < spaminterval*1000) {
            spams(message,Suser.GiveawaySpam,spaminterval)
            return;
        }
        else { Suser.GiveawaySpam = new Date().getTime()}
    }
    else { Suser.GiveawaySpam = new Date().getTime()}

    UserScoreServer = await DBserver.fetch(`TC_${GuildID}_${GiveawayID}`,{target: `.score`})
    if(UserScoreServer===null)UserScoreServer=0
    UserScoreServerRemain = 500 - UserScoreServer
    if(UserScoreServer>=500){
        ScoreText = `✅ | **You are Eligible for Nitro Giveaway\n ℹ️ | You Need to invite at least \`1\` Person to TC Server\n ℹ️ | Type \`!invite\` to check your invite progress**`;
        UserScoreServerRemain=0;
    } 
    else{
        ScoreText = `⛔ | **You are not yet eligible for Nitro Classic giveaway!!\n ℹ️ | You Need to invite at least \`1\` Person to TC Server\n ℹ️ | Type \`!invite\` to check your invite progress**`
    } 
        textTitle = `Server Score`
        let DailyEmbed = new Discord.RichEmbed()
        .setAuthor(GiveawayUserName + ` TC Server` ,GiveawayIcon)
        .setTitle(`Nitro Classic Giveaway Over on 15th Jan 2020`)
        .addField(textTitle,`${UserScoreServer}`)
        .addField(`Giveaway Requirment`,`${ScoreText}`)
        .setFooter(`You need more ${UserScoreServerRemain} score`)
        .setColor(`#91A151`)
    
        message.channel.send(DailyEmbed)

}
module.exports.help = {
    name : "gscore",
    aliases: "gs"
}