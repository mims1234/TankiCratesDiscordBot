const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const moment = require("moment")
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");

module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle) => {

    //if(message.author.id != '292675388180791297') return
    let textfile = JSON.parse(fs.readFileSync("TextFolder/TextFile.json","utf8"));

    if(message.author.id != '292675388180791297')
    {
        spaminterval = 5
    }
    else{
        spaminterval = 0
    }
    let Suser = message.author
    if (Suser.ResetKEY) {
        if (new Date().getTime() - Suser.ResetKEY < spaminterval*1000) {
            spams(message,Suser.ResetKEY,spaminterval)
            return;
        }
        else { Suser.ResetKEY = new Date().getTime()}
    }
    else { Suser.ResetKEY = new Date().getTime()}
    
    UserID = message.author.id
    UserName = message.author.username

    bot.confirmation = async (message, question, limit = 30000) => {
        const filter = m => m.author.id === message.author.id;
        await message.channel.send('**Profile Reset Confirmation Menu**\n```md\n'+question+'```\n**Type `yes` to confirm or `exit` to quit menu**');
            try {
            const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
            return collected.first().content;
            } catch (e) {
            return false;
            }
        };

    Text = ``
    Text = Text + `#Confirmation-Message:\n====================`
    Text = Text + `\n\n⚠ Accepting this WILL RESET YOUR PROFILE of TANKICRATES!!`
    Text = Text + `\n\n#Do you want to Reset?`
    ResetConfirmation = await bot.confirmation(message,Text)
    if(ResetConfirmation === false) return message.channel.send(textfile['QPaintWiki'].NoEntry)
    if(ResetConfirmation === 'exit') return message.channel.send(textfile['QInventory'].exit)
    ResetConfirmation = ResetConfirmation.toLowerCase()

    if(ResetConfirmation === `yes` || ResetConfirmation === `y`)
    {
        await DBprofile.delete(`TC_${UserID}`)
        await DBidle.delete(`TC_${UserID}`)
        await DBachievements.delete(`TC_${UserID}`)
        message.reply(`\n:no_mouth: | ${UserName} Profile in Tankicrates BOT has been reseted as requested!!`)
    }
    else return message.channel.send(textfile['QInventory'].InvalidEntry)


}
module.exports.help = {
    name : "resetProfile",
    //desc : "Prestige Level up",
    //aliases: "d"
}