const numberFormatter = require("number-formatter");
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const fs = require("fs");

const startGift = require("../Auto_commands/startGift.js");
const startProfile = require("../Auto_commands/startUP.js")

module.exports = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift) => {

    //if(message.author.id != '292675388180791297') return

    let textfile = JSON.parse(fs.readFileSync("TextFolder/TextFile.json","utf8"));
    let gift = JSON.parse(fs.readFileSync("DataBase/DB_Gift.json","utf8"));
    let prefix = Prefix.prefix;
    let Suser = message.author

    Suser.InboxGiftID = message.author.id
    Suser.InboxGiftName = message.author.username

    bot.InboxPageFunction = async (message, limit = 60000) => {
    const filter = m => m.author.id === message.author.id;
    data = await DBgift.fetch(`TC_${Suser.InboxGiftID}`,{target:`.Gifts`})
    InboxMsg=``
    Ndata = Object.keys(data) 
    z=1;
    for(a in Ndata)
    {
            if(data[`${Ndata[a]}`]!=null) InboxMsg = InboxMsg + `${z++}. [${gift[data[`${Ndata[a]}`].GiftID].name}](From: ${data[`${Ndata[a]}`].SenderName})  Date: ${data[`${Ndata[a]}`].TimeStamp}\n`
    }
    await DBgift.set(`TC_${Suser.InboxGiftID}`,true,{target:`.giftReadStatus`})
    question = `**Gift Inbox -- 🔰 ${Suser.InboxGiftName} Inbox**\n\`\`\`md\nSelect a Gift number from below\n========================\n\n`+InboxMsg+`\n> Menu closes in 60 secs\`\`\``
    await message.channel.send(question)
            try {
            const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
            return collected.first().content;
            } catch (e) {
            return false;
            }
    };

    bot.InboxDisplayFunction = async (message,InboxGiftPage, limit = 60000) => {
        data = await DBgift.fetch(`TC_${Suser.InboxGiftID}`,{target:`.Gifts`})
        NDdata = Object.keys(data) 
        Ndata=[]
        b=0
        for(a in NDdata)
        {
                if(data[`${NDdata[a]}`]!=null){
                        Ndata[b] = NDdata[a];
                        b++;
                } 
        }
        InboxGiftInboxName = `${data[`${Ndata[InboxGiftPage-1]}`].SenderName}`
        GiftName = `${gift[data[`${Ndata[InboxGiftPage-1]}`].GiftID].name}`
        GiftURL = `${gift[data[`${Ndata[InboxGiftPage-1]}`].GiftID].url}`
        InboxGiftInboxMsg = `${data[`${Ndata[InboxGiftPage-1]}`].GiftMessage}`
        InboxGiftTimeStamp = `${data[`${Ndata[InboxGiftPage-1]}`].TimeStamp}`

        InboxDisplayEmbed = new Discord.RichEmbed()
        .setAuthor(`Gift by ${InboxGiftInboxName}`)
        .setTitle(`${GiftName}`)
        .addField('Date:',`***${InboxGiftTimeStamp}***`)
        .addField('Message:',`***${InboxGiftInboxMsg}***`)
        .setColor('#99ffcc')
        .setImage(GiftURL)

        message.channel.send(InboxDisplayEmbed)
    };

    bot.InboxDeleteFunction = async (message,DeleteInboxQuestion,DeleteCode, limit = 60000) => {
        const filter = m => m.author.id === message.author.id;
        await message.channel.send(DeleteInboxQuestion)
        try {
        const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
        if(collected.first().content===`y` || collected.first().content==='yes')
        {
                return true
        }else{
                return false
        }
        } catch (e) {
        return false;
        }
    };

    if(args[1])code = args[1].toLowerCase()
    else code = args[1]
    switch(code)
    {
        case "del":
        case "delete":
        case "d":       data = await DBgift.fetch(`TC_${Suser.InboxGiftID}`,{target:`.Gifts`})
                        InboxDataArray = Object.keys(data) 
                        InboxDeleteArray=[]
                        b=0;
                        for(a in InboxDataArray)
                        {
                                if(data[`${InboxDataArray[a]}`]!=null){
                                        InboxDeleteArray[b] = InboxDataArray[a]
                                        b++ 
                                } 
                        }
                        DeleteCode = args[2]
                        try{
                                DeleteCode =parseInt(DeleteCode)
                        } catch(e)
                        {
                                return message.channel.send(`**To delete a gift type:** \`${prefix}inbox del <gift-number>\``)
                        }
                        DeleteCode--
                        //return console.log(InboxDeleteArray[DeleteCode])
                        if(!InboxDeleteArray[DeleteCode]) return message.channel.send(`**To delete a gift type:** \`${prefix}inbox del <gift-number>\` or the \`<gift-number> doesnt exist\``)
                        if(InboxDeleteArray[DeleteCode]==="0") return message.channel.send(`**You cannot delete admin message**`)
                        DeleteInboxQuestion = `\`\`\`md\nConfirm Deletion -- 🔰 ${Suser.InboxGiftName} Inbox\n========================\n\n${DeleteCode+1}. ${gift[data[`${InboxDeleteArray[DeleteCode]}`].GiftID].name} From: ${data[`${InboxDeleteArray[DeleteCode]}`].SenderName} On: ${data[`${InboxDeleteArray[DeleteCode]}`].TimeStamp} Gift !!\`\`\`\n    **Type \`yes\` or \`y\` to confirm delete!!**`
                        InboxDeleteCheck = await bot.InboxDeleteFunction(message,DeleteInboxQuestion,DeleteCode) 
                        if(InboxDeleteCheck===true)
                        {
                                await DBgift.set(`TC_${Suser.InboxGiftID}`,null,{target:`.Gifts.${InboxDeleteArray[DeleteCode]}`})
                                message.channel.send(`*Deleted* ***${gift[data[`${InboxDeleteArray[DeleteCode]}`].GiftID].name}*** *From:* ***${data[`${InboxDeleteArray[DeleteCode]}`].SenderName}*** *On:* ***${data[`${InboxDeleteArray[DeleteCode]}`].TimeStamp}*** *Gift !!*`)
                        }
                        else{
                                message.channel.send(`**Canceled !!**`)
                        }
                        console.log(`${Suser.InboxGiftName} Deleted a message from Inbox`) 

        break;
        default:        data =  await DBgift.fetch(`TC_${Suser.InboxGiftID}`)
                        if(!data)
                        {
                                await startProfile(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBgift,Suser.InboxGiftID,Suser.InboxGiftName)
                                await startGift(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBgift,Suser.InboxGiftID,Suser.InboxGiftName)
                                data =  await DBgift.fetch(`TC_${Suser.InboxGiftID}`)
                                GiftCountData = data.giftcount
                                if(GiftCountData===0) return message.channel.send(`Your Gift Inbox is Empty!!`)
                                GiftCount = numberFormatter("#,##0.##",GiftCountData)
                        }
                        else
                        {
                                GiftCountData = data.giftcount
                                if(GiftCountData===0) return message.channel.send(`Your Gift Inbox is Empty!!`)
                                GiftCount = numberFormatter("#,##0.##",GiftCountData)
                        }
                
                        InboxGiftPage = await bot.InboxPageFunction(message)
                        if(InboxGiftPage === 'exit') return message.channel.send(textfile['QInventory'].exit)
                        if(InboxGiftPage === false) return message.channel.send(textfile['QInventory'].NoEntry)
                        if(!(InboxGiftPage>0 && InboxGiftPage<=GiftCountData)) return message.channel.send(textfile['QInventory'].InvalidEntry)
                        console.log(`Request for ${Suser.InboxGiftName} Gift Inbox`)
                        InboxGiftDisplay = await bot.InboxDisplayFunction(message,InboxGiftPage)            
    }
}
