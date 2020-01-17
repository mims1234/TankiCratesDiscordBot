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
    A = await DBprofile.startsWith(`TC`,{target:`.data`}).then(resp=>{
        for(a in resp)
        {
            let NewProfile = {
                username: `${resp[a].data.username}`,
                id: `${resp[a].data.id}`,
                senderid:`292675388180791297`,
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
            if(resp[a].data.id!=null) DBgift.set(`TC_${resp[a].data.id}`,NewProfile);
        }
    })
  
    message.channel.send('Gift DB Update Complete !!')
    
}
module.exports.help = {
    name : "123DBupdate"
}