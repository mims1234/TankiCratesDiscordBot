const spams = require("../spams.js");

const giftSend = require("../AGiftCommand/giftSend.js");
const giftInbox = require("../AGiftCommand/giftInbox.js");
const giftBlock = require("../AGiftCommand/giftBlock.js");
const giftUnblock = require("../AGiftCommand/giftUnblock.js");
const giftHelp = require("../AGiftCommand/giftHelpServer.js");


module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift,DBserver) => {

  
    // if(message.author.id != '292675388180791297')
    // {
    //   return message.channel.send('**Bugs being FIxed** \n*Please try this command at the TankiCrates DM `type xgift` to check your mail*').then(msg => msg.delete(15000));
    //   console.log(`Request by ${message.author.username} from  Server`);
    // }
    let Suser = message.author
    let spaminterval =5
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
        case "send":  giftSend(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift)
        break;
        case "inbox": giftInbox(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift)
        break;
        case "block": giftBlock(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift)
        break;
        case "unblock": giftUnblock(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift)
        break;
        default: giftHelp(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift)
                    console.log(`${message.author.username} Requested Gift Help List`)
        break;
    }

}
module.exports.help = {
    name : "gift",
    desc : "Shows all gift options"
}