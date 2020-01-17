const spams = require("../spams.js");
const Prefix = require("../prefix.json");

const botInvite = require("../ABotCommands/botInvite.js");
const botServerInvite = require("../ABotCommands/botServerInvite.js");
const botVote = require("../ABotCommands/botVote.js");
const botHelp = require("../ABotCommands/botHelp.js");

module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift,DBserver) => {

    let Suser = message.author
    let spaminterval =2
    if (Suser.HelpSpam) {
        if (new Date().getTime() - Suser.HelpSpam < spaminterval*1000) {
            spams(message,Suser.HelpSpam,spaminterval)
            return;
        }
        else { Suser.HelpSpam = new Date().getTime()}
    }
    else { Suser.HelpSpam = new Date().getTime()}

    prefix = Prefix.prefix
    HelpUserID = message.author.id 
    HelpUserName = message.author.username
    helpmsg = `\`\`\`md
Genral-Commands:
1.   <${prefix}bot  -   General bot help command>
\`\`\`\`\`\`md
Tanki-Online-Commands:
1.   <${prefix}ratings   -   Tanki Online User Rating>
\`\`\`\`\`\`md
Economy-Commands:
1.   <${prefix}open  -   Open Container>
2.   <${prefix}buy  -   Buy Container>
3.   <${prefix}profile  -   Check Profile>
4.   <${prefix}inv  -   Check Inventory>
5.   <${prefix}paints  -   Paint Menu>
6.   <${prefix}skins  -   Skin Menu>
7.   <${prefix}prestige  -   Prestige Level>
8.   <${prefix}daily  -  Daily Reward>
9.   <${prefix}weekly  -   Weekly Reward>
10.  <${prefix}gift  -   Gift Help>
11.  <${prefix}top  -   Leaderboard Help>    

\`\`\`\`⫸ Last Updated 10th Jan 2020 ⫷\`
    `

    message.channel.send(helpmsg)

}
module.exports.help = {
    name : "help",
    desc : "Shows all general commands",
    aliases:"h"
}