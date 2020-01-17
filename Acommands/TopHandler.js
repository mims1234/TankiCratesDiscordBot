const spams = require("../spams.js");

const topGlobalScore = require("../ATopCommands/topGlobalScore.js");
const topServerScore = require("../ATopCommands/topServerScore.js");
const topHelp = require("../ATopCommands/topHelp.js");
    
module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift,DBserver) => {

    let Suser = message.author
    let spaminterval =5
    if (Suser.TopSpam) {
        if (new Date().getTime() - Suser.TopSpam < spaminterval*1000) {
            spams(message,Suser.TopSpam,spaminterval)
            return;
        }
        else { Suser.TopSpam = new Date().getTime()}
    }
    else { Suser.TopSpam = new Date().getTime()}

    if(args[0]) code = args[0].toLowerCase()
    code = args[0]
    switch(code)
    {
        case "global":
        case "g":  topGlobalScore(bot,message,args,DBprofile)
        break;
        case "s":
        case "server": topServerScore(bot,message,args,DBprofile,DBserver)
        break;
        default: topHelp(bot,message,args,DBguildSetting)
                    console.log(`${message.author.username} Requested Leaderboard Help List`)
        break;
    }

}
module.exports.help = {
    name : "top",
    desc : "Shows all general commands"
}