const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");


module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift,DBserver) => {

    //if(message.author.id != '292675388180791297')
    let textfile = JSON.parse(fs.readFileSync("TextFolder/TextFile.json","utf8"));
    let container = JSON.parse(fs.readFileSync("DataBase/DB_ContainerDrops.json","utf8"));
    let paintName = JSON.parse(fs.readFileSync("DataBase/DB_PaintName.json","utf8"));
    let paints = JSON.parse(fs.readFileSync("DataBase/DB_PaintID.json","utf8"));
    let prefix = Prefix.prefix;

    let messageArray = message.content.split(' ');
    let player = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(player)
    {
            PaintMenu = messageArray[2]
            PaintsUserID = player.id
            PaintsUserName = player.user.username
    }
    else{
            PaintMenu = messageArray[1]
            PaintsUserID = message.author.id
            PaintsUserName = message.author.username
    }

    let Suser = message.author
    let spaminterval =10
        if (Suser.SkinSpam) {
            if (new Date().getTime() - Suser.SkinSpam < spaminterval*1000) {
                spams(message,Suser.SkinSpam,spaminterval)
                return;
            }
            else { Suser.SkinSpam = new Date().getTime()}
        }
        else { Suser.SkinSpam = new Date().getTime()}

    let profile = await DBprofile.fetch(`TC_${PaintsUserID}`,{target : '.username'}) 
    if(player)
    {
            if(!profile) return message.channel.send(`**:file_folder: | ${PaintsUserName} does not have a Profile yet**`)
    }
    else{
            if(!profile) return message.channel.send(`**Use \`${prefix}start\` to make a New Profile**`)
    }


        bot.Page = async (message, question, limit = 60000) => {
        const filter = m => m.author.id === message.author.id;
        await message.channel.send(question);
                try {
                const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
                return collected.first().content;
                } catch (e) {
                return false;
                }
        };

        bot.Display = async (CAT,CATN, Val,PaintsUserID) => {
        UserPaintID = [] 
        UserPaintAmount = [] 
        j=1;
        PaintList = await DBprofile.fetch(`TC_${PaintsUserID}`,{target : `.Skins.${CAT}`})
        ArrayPaintLIst = Object.keys(PaintList)
            for(var i in ArrayPaintLIst)
            {
                    PName = paints[ArrayPaintLIst[i]].Name
                    msg = msg + `\n[${j}] < ${PName} >`
                    UserPaintID[j] = ArrayPaintLIst[i]
                    j=j+1
                    k=1
            }
            if(!(Val>=1 && Val<(UserPaintID.length))) return message.channel.send(textfile['QInventory'].InvalidEntry)
            PaintID =  UserPaintID[Val]  
            PaintName = paints[PaintID].Name
            PaintURL = paints[PaintID].URL
            PaintHEX = `#FFB9B9`
            PaintType = CATN
            if(!UserPaintAmount[Val]) UserPaint = 0
            else UserPaint = UserPaintAmount[Val]

            let Embed = new Discord.RichEmbed()
            .setAuthor(`🔰 ${PaintsUserName} Inventory`)
            .setTitle(`${PaintName} Skin`)
            .setColor(PaintHEX)
            .setImage(PaintURL)
            .setFooter(`${PaintType}`)

            message.channel.send(Embed)         
        };

        bot.PaintSubPage = async (message, QSpage,limit = 60000) => {
            const filter = m => m.author.id === message.author.id;
            await message.channel.send(QSpage);
                    try {
                    const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
                    return collected.first().content;
                    } catch (e) {
                    return false;
                    }
        };

        bot.Paint = async (message, SubPage,CAT,CATN,limit = 60000) => {
        const filter = m => m.author.id === message.author.id;
        msgHead = '@Please "select a number from below options";',j=1,k=0;
        UserPaintID = [] 
        msg = []
        for(i=1;i<10;i++) msg[i] = '\n'
        j=1;pgn=1,count=1;
        PaintList = await DBprofile.fetch(`TC_${PaintsUserID}`,{target : `.Skins.${CAT}`})
        if(PaintList===undefined || PaintList===null) return  message.channel.send('**You do dont have any skins of this grade**') 
        ArrayPaintLIst = Object.keys(PaintList)
            for(i in ArrayPaintLIst)
            {
                    if(count===11){pgn++;count=1;}
                    PName = paints[`${ArrayPaintLIst[i]}`].Name
                    msg[pgn] = msg[pgn] + `\n[${j}] < ${PName} >`
                    UserPaintID[j] = ArrayPaintLIst[i]
                    j=j+1
                    k=1
                    count++;
            }
            if(k===0) return  message.channel.send('**You do dont have any skin of this grade**') 
            msgSelect = msg[SubPage]
            message.channel.send("**Skin Menu -- 🔰 "+PaintsUserName+" Inventory "+CATN+" Skins**\n```less\n"+msgHead+msgSelect+"\n\n#Type [exit] to close the menu```")
            try {
            const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
            return collected.first().content;
            } catch (e) {
            return false;
            }
        }

        data = await DBprofile.fetch(`TC_${PaintsUserID}`)

        function SkinLen(PaintID)
        {
            if(PaintID.startsWith('XT',5)) return 'XT'
            if(PaintID.startsWith('LC',5)) return 'LC'
            if(PaintID.startsWith('DC',5)) return 'DC'
            if(PaintID.startsWith('PR',5)) return 'PR' 
            if(PaintID.startsWith('UC',5)) return 'UC'
        }

        var SkinCount = Object.keys(container['A'])
        XTC=LCC=DCC=PRC=UCC=0

        for(a in SkinCount)
        {
            if(SkinCount[a].startsWith(`XT`,5)) XTC++;
            if(SkinCount[a].startsWith(`LC`,5)) LCC++;
            if(SkinCount[a].startsWith(`DC`,5)) DCC++;
            if(SkinCount[a].startsWith(`PR`,5)) PRC++;
            if(SkinCount[a].startsWith(`UC`,5)) UCC++;
        } 

        XT = data.totalXT
        LC = data.totalLC
        DC = data.totalDC
        PR = data.totalPR
        UC = data.totalUC

        XT = Math.round((XT/XTC)*100);
        LC = Math.round((LC/LCC)*100);
        DC = Math.round((DC/DCC)*100);
        PR = Math.round((PR/PRC)*100);
        UC = Math.round((UC/UCC)*100);

        
    Qpage = `**Skin Menu -- 🔰 ${PaintsUserName} Inventory**\n\`\`\`md\nSELECT A CATEGORY NUMBER\n========================\n\n1. [XT](${XT} %)\n2. [Legacy](${LC} %)\n3. [Demonic](${DC} %)\n4. [Prime](${PR} %)\n5. [Ultra](${UC} %)\n\n> Menu closes in 60 secs\`\`\``
    Page = await bot.Page(message,Qpage)
    if(Page === 'exit') return message.channel.send(textfile['QInventory'].exit)
    if(Page === false) return message.channel.send(textfile['QInventory'].NoEntry)
    if(!(Page>=1 && Page<8)) return message.channel.send(textfile['QInventory'].InvalidEntry)

    if(Page === '1'){ CAT = 'XT',CATN = 'XT'}
    if(Page === '2'){ CAT = 'LC',CATN = 'Legacy'}
    if(Page === '3'){ CAT = 'DC',CATN = 'Demonic'}
    if(Page === '4'){ CAT = 'PR',CATN = 'Prime'}
    if(Page === '5'){ CAT = 'UC',CATN = 'Ultra'}

    UserPaintTotalCat = await DBprofile.fetch(`TC_${PaintsUserID}`,{target : `.total${CAT}`});
    PG = parseInt(UserPaintTotalCat/10) + 1;

    QSpage = `**Skin Menu -- 🔰 ${PaintsUserName} Inventory ${CATN} Skins**\n\`\`\`md\nSELECT A PAGE NUMBER\n========================\n\n`
    for(z=1;z<=PG;z++)
    {
        QSpage = QSpage + `${z}. [Page](#${z})\n`
    }
    QSpage =QSpage +     `\n\n> Menu closes in 60 secs\`\`\``

    if(PG!=1){
        var SubPage = await bot.PaintSubPage(message,QSpage);
        if(SubPage === 'exit') return message.channel.send(textfile['QInventory'].exit)
        if(SubPage === false) return message.channel.send(textfile['QInventory'].NoEntry)
        if(SubPage != parseInt(SubPage)) return //message.channel.send(textfile['QInventory'].InvalidEntry)
    }
    else SubPage = 1;

    var Val = await bot.Paint(message,SubPage,CAT,CATN)
    if(Val === 'exit') return message.channel.send(textfile['QInventory'].exit)
    if(Val === false) return message.channel.send(textfile['QInventory'].NoEntry)
    if(Val != parseInt(Val)) return //message.channel.send(textfile['QInventory'].InvalidEntry)
    Val = parseInt(Val)
    await bot.Display(CAT,CATN,Val,PaintsUserID);

}
module.exports.help = {
    name : "skins",
    desc : "Display's your skins list"
}