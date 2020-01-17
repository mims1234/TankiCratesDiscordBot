const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const moment = require("moment")
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");

const giftSend = require("../AGiftCommand/giftSend.js");
const giftInbox = require("../AGiftCommand/giftInbox.js");
const giftBlock = require("../AGiftCommand/giftBlock.js");
const giftUnblock = require("../AGiftCommand/giftUnblock.js");
const giftHelp = require("../AGiftCommand/giftHelpDM.js");


module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift) => {

    //if(message.author.id != '292675388180791297')
    // {
    //     if(message.guild.id != '442704155644264450') return
    // }

    let Suser = message.author
    let spaminterval =0
    if (Suser.GiftSpam) {
        if (new Date().getTime() - Suser.GiftSpam < spaminterval*1000) {
            spams(message,Suser.GiftSpam,spaminterval)
            return;
        }
        else { Suser.GiftSpam = new Date().getTime()}
    }
    else { Suser.GiftSpam = new Date().getTime()}

    if(args[0]) code = args[0].toLowerCase()
    code = args[0]

    switch(code)
    {
        case "inbox": giftInbox(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift)
        break;
        case "block":   args[1]="list"
                        giftBlock(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift)
        break;
        default: giftHelp(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift)
        console.log(`${message.author.username} Requested DM Gift Help List`)
        break;
    }

}
module.exports.help = {
    name : "gift",
    desc : "Shows all gift options"
}