const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const moment = require("moment")
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");

module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift,DBserver) => {

    //if(message.author.id != '292675388180791297') return
    let prestigeData = JSON.parse(fs.readFileSync("DataBase/Prestige.json","utf8"));
    let textfile = JSON.parse(fs.readFileSync("TextFolder/TextFile.json","utf8"));
    let container = JSON.parse(fs.readFileSync("DataBase/DB_ContainerDrops.json","utf8"));
    let paintName = JSON.parse(fs.readFileSync("DataBase/DB_PaintName.json","utf8"));
    let paints = JSON.parse(fs.readFileSync("DataBase/DB_PaintID.json","utf8"));

    if(message.author.id != '292675388180791297')
    {
        spaminterval = 5
    }
    else{
        spaminterval = 0
    }

    spaminterval = 5
    let Suser = message.author
    if (Suser.PrestigeKey) {
        if (new Date().getTime() - Suser.PrestigeKey < spaminterval*1000) {
            spams(message,Suser.PrestigeKey,spaminterval)
            return;
        }
        else { Suser.PrestigeKey = new Date().getTime()}
    }
    else { Suser.PrestigeKey = new Date().getTime()}
    
    PrestigeID = message.author.id
    PrestigeUserName = message.author.username
    PrestigeIcon = message.member.user.avatarURL

    PrestigeLevel = await DBprofile.fetch(`TC_${PrestigeID}`,{target : `.prestige`})
    PrestigeTotalPaints = await DBprofile.fetch(`TC_${PrestigeID}`,{target : `.paints`})
    PrestigeCheck = await DBidle.fetch(`TC_${PrestigeID}`,{target : `.Prestige`})

    PrestigeCheckFucntion = async(PrestigeLevel,TotalPaints) => {
            if(PrestigeLevel === 0 && TotalPaints >= prestigeData[`data`].p1) return `prestige1`
            if(PrestigeLevel === 1 && TotalPaints >= prestigeData[`data`].p2) return `prestige2`
            if(PrestigeLevel === 2 && TotalPaints >= prestigeData[`data`].p3) return `prestige3`
            if(PrestigeLevel === 3 && TotalPaints >= prestigeData[`data`].p4) return `prestige4`
            if(PrestigeLevel === 4 && TotalPaints >= prestigeData[`data`].p5) return `prestige5`
            return null
    }

    PrestigePaintsCheck= async(PrestigeLevel,TotalPaints) => {
        if(PrestigeLevel === 0) return parseInt(prestigeData[`data`].p1)
        if(PrestigeLevel === 1) return parseInt(prestigeData[`data`].p2)
        if(PrestigeLevel === 2) return parseInt(prestigeData[`data`].p3)
        if(PrestigeLevel === 3) return parseInt(prestigeData[`data`].p4)
        if(PrestigeLevel === 4) return parseInt(prestigeData[`data`].p5)
        return null
    }

    bot.confirmation = async (message, question, limit = 30000) => {
        const filter = m => m.author.id === message.author.id;
        await message.channel.send('**Prestige Confirmation Menu**\n```md\n'+question+'```\n**Type `yes` to confirm or `exit` to quit menu**');
            try {
            const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
            return collected.first().content;
            } catch (e) {
            return false;
            }
        };

    //if(PrestigeCheck != true)

    P = await PrestigeCheckFucntion(PrestigeLevel,PrestigeTotalPaints)
    if(P != null)
    {
        PaintID = prestigeData[`${P}`].paint
        RewardPaintName = paints[`${PaintID}`].Name
        RewardPaintURL = paints[`${PaintID}`].URL
        RewardDropLuck = prestigeData[`${P}`].dropluck
        RewardCooldown = prestigeData[`${P}`].cooldown

        if(P === `prestige1`) textReward = `\n3. [Cooldown Decreased by -1 Second](Reduced Cooldown on open command)`
        if(P === `prestige2`) textReward = ` `
        if(P === `prestige3`) textReward = `\n3. [Cooldown Decreased by -1 Second](Reduced Cooldown on open command)`
        if(P === `prestige4`) textReward = ` `
        if(P === `prestige5`) textReward = `\n3. [Cooldown Decreased by -1 Second](Reduced Cooldown on open command)`

        Text = ``
        Text = Text + `#Confirmation-Message:\n====================`
        Text = Text + `\n#Prestige Level ${PrestigeLevel + 1} Rewards :\n\n1. [${RewardPaintName} Paint](This Paint will stay forever)\n2. [Drop Luck Increased +${RewardDropLuck}%](More Chances for Exotic Drops)${textReward}`
        Text = Text + `\n\n⚠ PRESTIGE WILL RESET YOUR PAINTs & SKINs COLLECTION !!`
        Text = Text + `\n\n#Do you want to Prestige?`
        PrestigeConfirmation = await bot.confirmation(message,Text)
        if(PrestigeConfirmation === false) return message.channel.send(textfile['QPaintWiki'].NoEntry)
        if(PrestigeConfirmation === 'exit') return message.channel.send(textfile['QInventory'].exit)
        PrestigeConfirmation = PrestigeConfirmation.toLowerCase()

        if(PrestigeConfirmation === `yes` || PrestigeConfirmation === `y`)
        {
            PaintID = prestigeData[`${P}`].paint
            RewardPaintName = paints[`${PaintID}`].Name
            RewardPaintURL = paints[`${PaintID}`].URL
            RewardDropLuck = prestigeData[`${P}`].dropluck
            RewardCooldown = prestigeData[`${P}`].cooldown
            PrestigeLevel = parseInt(P.slice(8))
    
            await DBprofile.set(`TC_${PrestigeID}`,PrestigeLevel,{target : `.prestige`})
            await DBprofile.set(`TC_${PrestigeID}`,true,{target:`.Paints.P.${PaintID}`})
            await DBprofile.add(`TC_${PrestigeID}`,1,{target:`.totalP`})
    
            await DBprofile.set(`TC_${PrestigeID}`,null,{target:`.Paints.C`})
            await DBprofile.set(`TC_${PrestigeID}`,null,{target:`.Paints.U`})
            await DBprofile.set(`TC_${PrestigeID}`,null,{target:`.Paints.R`})
            await DBprofile.set(`TC_${PrestigeID}`,null,{target:`.Paints.E`})
            await DBprofile.set(`TC_${PrestigeID}`,null,{target:`.Paints.L`})
            await DBprofile.set(`TC_${PrestigeID}`,null,{target:`.Paints.A`})

            await DBprofile.set(`TC_${PrestigeID}`,null,{target:`.Skins.XT`})
            await DBprofile.set(`TC_${PrestigeID}`,null,{target:`.Skins.LC`})
            await DBprofile.set(`TC_${PrestigeID}`,null,{target:`.Skins.DC`})
            await DBprofile.set(`TC_${PrestigeID}`,null,{target:`.Skins.PR`})
            await DBprofile.set(`TC_${PrestigeID}`,null,{target:`.Skins.UC`})
    
            await DBprofile.set(`TC_${PrestigeID}`,0,{target:`.totalC`})
            await DBprofile.set(`TC_${PrestigeID}`,0,{target:`.totalU`})
            await DBprofile.set(`TC_${PrestigeID}`,0,{target:`.totalR`})
            await DBprofile.set(`TC_${PrestigeID}`,0,{target:`.totalE`})
            await DBprofile.set(`TC_${PrestigeID}`,0,{target:`.totalL`})
            await DBprofile.set(`TC_${PrestigeID}`,0,{target:`.totalA`})

            await DBprofile.set(`TC_${PrestigeID}`,0,{target:`.totalXT`})
            await DBprofile.set(`TC_${PrestigeID}`,0,{target:`.totalLC`})
            await DBprofile.set(`TC_${PrestigeID}`,0,{target:`.totalDC`})
            await DBprofile.set(`TC_${PrestigeID}`,0,{target:`.totalPR`})
            await DBprofile.set(`TC_${PrestigeID}`,0,{target:`.totalUC`})
    
            await DBidle.set(`TC_${PrestigeID}`,false,{target : `.Prestige`})
    
            data = await DBprofile.fetch(`TC_${PrestigeID}`)
            
            NewPaintsTotal = (data.totalP + data.totalFL + data.totalHO + data.totalS)
            
            await DBprofile.set(`TC_${PrestigeID}`,NewPaintsTotal,{target:`.paints`})
            await DBprofile.set(`TC_${PrestigeID}`,0,{target:`.skins`})

            if(P === `prestige1`) textReward = `\n[3] Cooldown Decreased by -1 Second`
            if(P === `prestige2`) textReward = ` `
            if(P === `prestige3`) textReward = `\n[3] Cooldown Decreased by -1 Second`
            if(P === `prestige4`) textReward = ` `
            if(P === `prestige5`) textReward = `\n[3] Cooldown Decreased by -1 Second`
    
            let PRSTIGEEMBED = new Discord.RichEmbed()
            .setAuthor(`| ${PrestigeUserName} Prestige Leveled-UP !!`,PrestigeIcon)
            .setColor(`#ffd2a6`)
            .addField(`- - - - - - - - - - - - - - - - - - - - - - - - - - -\n:tada: | Prestige Level ${PrestigeLevel} recived Rewards :`,`[1] ${RewardPaintName} Paint\n[2] Drop Luck Increased +${RewardDropLuck}%${textReward}\n\n`)
            .addField(`- - - - - - - - - - - - - - - - - - - - - - - - - - -\nCongratulations you have reached Prestige Level ${PrestigeLevel}`,`> *${RewardPaintName} Paint Preview* :`)
            .setImage(RewardPaintURL)
            //.setFooter("You must pick any of the above option to continue to use open command!")
    
            message.reply(PRSTIGEEMBED)
        }
        else return message.channel.send(textfile['QInventory'].InvalidEntry)

    }else {
        A = await PrestigePaintsCheck(PrestigeLevel,PrestigeTotalPaints)
        if(PrestigeLevel !=5)
            message.channel.send(`***${message.author.username} Prestige Level : ${PrestigeLevel}***\n*You need* ***${A-PrestigeTotalPaints}*** *Paints more to Reach Prestige* ***${PrestigeLevel+1}***`)
        else
            message.channel.send(`***${message.author.username}  Prestige Level : ${PrestigeLevel}***\n*You have reached the highest Prestige Level*`)
     
    }

}
module.exports.help = {
    name : "prestige",
    desc : "Prestige Status",
    //aliases: "d"
}