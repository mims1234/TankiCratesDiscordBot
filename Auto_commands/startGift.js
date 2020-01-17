const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const moment = require("moment")
const db = require("quick.db");
const fs = require("fs");


module.exports= async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBgift,NewID,NewName) => {

    if(NewID)
    {
        StartGiftName = NewName
        StartGiftID = NewID
    }else
    {
        StartGiftName = message.author.username
        StartGiftID = message.author.id
    }

    FirstSender = 292675388180791297

    //if(!user)
    { 
        let NewProfile = {
        username: `${StartGiftName}`,
        id: `${StartGiftID}`,
        senderid:`${FirstSender}`,
        giftcount:1,
        giftIDcount:1,
        giftReadStatus:false,
        Gifts:{
            "0":{
            SenderName:"Bot Admin: MiMs#3590",
            GiftID:"20GIFT001",
            GiftMessage:"Thank you for using TankiCrates BOT, Visit our server at https://discord.gg/gghhnvv",
            TimeStamp:`${moment().format('ll')}`
        }},
        Block:{
            "292675388180791297":null
        }
        }

    await DBgift.set(`TC_${StartGiftID}`,NewProfile);

    console.log(`${StartGiftName} Gift Profile Created`)
    }
}
