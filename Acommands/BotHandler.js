const spams = require("../spams.js");

const botInvite = require("../ABotCommands/botInvite.js");
const botServerInvite = require("../ABotCommands/botServerInvite.js");
const botPrefix = require("../ABotCommands/botPrefix.js");
const botVote = require("../ABotCommands/botVote.js");
const botHelp = require("../ABotCommands/botHelp.js");
const botPing = require("../ABotCommands/botPing.js");

module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift,DBserver) => {

    let Suser = message.author
    let spaminterval =3
    if (Suser.BotSpam) {
        if (new Date().getTime() - Suser.BotSpam < spaminterval*1000) {
            spams(message,Suser.BotSpam,spaminterval)
            return;
        }
        else { Suser.BotSpam = new Date().getTime()}
    }
    else { Suser.BotSpam = new Date().getTime()}

    if(args[0]) code = args[0].toLowerCase()
    code = args[0]
    switch(code)
    {
        case "invite":  botInvite(bot,message,args)
        break;
        case "server": botServerInvite(bot,message,args)
        break;
        case "vote": botVote(bot,message,args)
        break;
        case "prefix": botPrefix(bot,message,args,DBguildSetting)
        break;
        case "ping": botPing(bot,message,args)
        break;
        default: botHelp(bot,message,args,DBguildSetting)
                    console.log(`${message.author.username} Requested General Help List`)
        break;
    }

}
module.exports.help = {
    name : "bot",
    desc : "Shows all general commands"
}