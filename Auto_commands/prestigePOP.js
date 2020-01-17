const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");

module.exports = async (bot,message,args,P,PrestigeLevel) => {
    
    let Suser = message.author
    let spaminterval =0.5
    if (Suser.PrestigeCheck) {
        if (new Date().getTime() - Suser.PrestigeCheck < spaminterval*1000) {
            //spams(message,Suser.PrestigeCheck,spaminterval)
            return;
        }
        else { Suser.PrestigeCheck = new Date().getTime()}
    }
    else { Suser.PrestigeCheck = new Date().getTime()}

    let prestigeData = JSON.parse(fs.readFileSync("DataBase/Prestige.json","utf8"));
    let paints = JSON.parse(fs.readFileSync("DataBase/DB_PaintID.json","utf8"));
        
    PrestigeUserName = message.author.username
    PrestigeUserID = message.author.id
    PrestigeUserIcon = message.author.displayAvatarURL
    console.log(`Prestige POP UP for ${PrestigeUserName}`)

    if(P === `prestige0`) return
    if(P === `prestige1`) textReward = `\n[3] Cooldown Decreased by -1 Second`
    if(P === `prestige2`) textReward = ` `
    if(P === `prestige3`) textReward = `\n[3] Cooldown Decreased by -1 Second`
    if(P === `prestige4`) textReward = ` `
    if(P === `prestige5`) textReward = `\n[3] Cooldown Decreased by -1 Second`


    PaintID = prestigeData[`${P}`].paint
    RewardPaintName = paints[`${PaintID}`].Name
    RewardPaintURL = paints[`${PaintID}`].URL
    RewardDropLuck = prestigeData[`${P}`].dropluck
    RewardCooldown = prestigeData[`${P}`].cooldown

    let PrestigeEMBED = new Discord.RichEmbed()
    .setAuthor(`| ${PrestigeUserName} Prestige Level-UP !!`,PrestigeUserIcon)
    .setColor(`#3000cf`)
    .addField('- - - - - - - - - - - - - - - - - - - - - - - - - - -\n:new: | You have an option now to :',`> *To Level UP your Prestige Level to ${PrestigeLevel + 1}*  -->  [\`xprestige\`]\n> *To Continue with your Current Progress*  -->  [\`xcontinue\`]`)
    //.addBlankField()
    .addField(`- - - - - - - - - - - - - - - - - - - - - - - - - - -\n:tada: | Prestige Level ${PrestigeLevel + 1} Rewards :`,`[1] ${RewardPaintName} Paint\n[2] Drop Luck Increased +${RewardDropLuck}%${textReward}\n\n`)
    //.addBlankField()
    .addField(`- - - - - - - - - - - - - - - - - - - - - - - - - - -\nPRESTIGE WILL RESET YOUR PAINTs & SKINs COLLECTION !!`,`> *${RewardPaintName} Paint Preview* :`)
    .setImage(RewardPaintURL)
    .setFooter("You must pick any of the above option to continue to use open command!")

    message.reply(PrestigeEMBED)

}