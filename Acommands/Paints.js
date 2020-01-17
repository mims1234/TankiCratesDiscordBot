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
    let player = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0] || args[0]);
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
        if (Suser.PaintSpam) {
            if (new Date().getTime() - Suser.PaintSpam < spaminterval*1000) {
                spams(message,Suser.PaintSpam,spaminterval)
                return;
            }
            else { Suser.PaintSpam = new Date().getTime()}
        }
        else { Suser.PaintSpam = new Date().getTime()}

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
        PaintList = await DBprofile.fetch(`TC_${PaintsUserID}`,{target : `.Paints.${CAT}`})
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
            .setTitle(`${PaintName} Paint`)
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
        PaintList = await DBprofile.fetch(`TC_${PaintsUserID}`,{target : `.Paints.${CAT}`})
        if(PaintList===undefined || PaintList===null) return  message.channel.send('**You do dont have any paints of this grade**')
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
            if(k===0) return  message.channel.send('**You do dont have any paint of this grade**') 
            msgSelect = msg[SubPage]
            message.channel.send("**Paint Menu -- 🔰 "+PaintsUserName+" Inventory "+CATN+" Paints**\n```less\n"+msgHead+msgSelect+"\n\n#Type [exit] to close the menu```")
            try {
            const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
            return collected.first().content;
            } catch (e) {
            return false;
            }
        }

        data = await DBprofile.fetch(`TC_${PaintsUserID}`)

        var PaintCount2 = Object.keys(container['U'])
        var PaintCount3 = Object.keys(container['R'])
        var PaintCount4 = Object.keys(container['E'])
        var PaintCount5 = Object.keys(container['L'])
        var PaintCount6 = Object.keys(container['A'])
        var PaintCount7 = Object.keys(container['P'])

        U = data.totalU
        R = data.totalR
        E = data.totalE
        L = data.totalL
        A = data.totalA
        P = data.totalP

        UP = Math.round((U/(PaintCount2.length - 10))*100);
        RP = Math.round((R/(PaintCount3.length - 10))*100);
        EP = Math.round((E/(PaintCount4.length - 10))*100);
        LP = Math.round((L/(PaintCount5.length - 5))*100);
        AP = 0 //Math.round((A/(PaintCount6.length - 42))*100);
        PP = Math.round((P/(PaintCount7.length - 0))*100);
        
    Qpage = `**Paint Menu -- 🔰 ${PaintsUserName} Inventory**\n\`\`\`md\nSELECT A CATEGORY NUMBER\n========================\n\n1. [Uncommon](${UP} %)\n2. [Rare](${RP} %)\n3. [Epic](${EP} %)\n4. [Legendary](${LP} %)\n5. [Exotic](${AP} %)\n6. [Prestige](${PP} %)\n\n> Menu closes in 60 secs\`\`\``  //[7] Prestige [${P}/${PaintCount7.length}]\n   
    Page = await bot.Page(message,Qpage)
    if(Page === 'exit') return message.channel.send(textfile['QInventory'].exit)
    if(Page === false) return message.channel.send(textfile['QInventory'].NoEntry)
    if(!(Page>=1 && Page<7)) return message.channel.send(textfile['QInventory'].InvalidEntry)

    if(Page === '1'){ CAT = 'U',CATN = 'Uncommon'}
    if(Page === '2'){ CAT = 'R',CATN = 'Rare'}
    if(Page === '3'){ CAT = 'E',CATN = 'Epic'}
    if(Page === '4'){ CAT = 'L',CATN = 'Legendary'}
    if(Page === '5'){ CAT = 'A',CATN = 'Exotic'}
    if(Page === '6'){ CAT = 'P',CATN = 'Prestige'}

    UserPaintTotalCat = await DBprofile.fetch(`TC_${PaintsUserID}`,{target : `.total${CAT}`});
    PG = parseInt(UserPaintTotalCat/10) + 1;

    QSpage = `**Paint Menu -- 🔰 ${PaintsUserName} Inventory ${CATN} Paints**\n\`\`\`md\nSELECT A PAGE NUMBER\n========================\n\n`
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
    name : "paints",
    desc : "Display's your paints list"
}