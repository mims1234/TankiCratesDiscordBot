const numberFormatter = require("number-formatter");
const Prefix = require("../prefix.json");
const BigSpams = require("../BigSpam.js");
const spams = require("../spams.js");
const Discord = require("discord.js");
const moment = require("moment")
const fs = require("fs");

const startGift = require("../Auto_commands/startGift.js");
const startUP = require("../Auto_commands/startUP.js")


module.exports= async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift) => {


    let textfile = JSON.parse(fs.readFileSync("TextFolder/TextFile.json","utf8"));
    let gift = JSON.parse(fs.readFileSync("DataBase/DB_Gift.json","utf8"));
    let prefix = Prefix.prefix;

    let Suser = message.author

    //Big Cooldown
    let BigSpamCheck = 180
    let BigSpam = 150
    let BigSpamCount = 1
    if (Suser.BigGiftSpam) {
        if(new Date().getTime() - Suser.BigGiftSpamON < BigSpam*1000)
        {
            BigSpams(bot,message,Suser.BigGiftSpamON,BigSpam,2)
            return;
        }
        else if (new Date().getTime() - Suser.BigGiftSpam < BigSpamCheck*1000) {
            if(Suser.BigGiftCount>=BigSpamCount) Suser.BigGiftSpamON=new Date().getTime();
        }
        else { Suser.BigGiftSpam = new Date().getTime();Suser.BigGiftCount=0}
    }
    else { Suser.BigGiftSpam = new Date().getTime();Suser.BigGiftCount=0}
    
    let spaminterval = 10
    if (Suser.GiftSendSpam) {
        if (new Date().getTime() - Suser.GiftSendSpam < spaminterval*1000) {
            spams(message,Suser.GiftSendSpam,spaminterval)
            return;
        }
        else { Suser.GiftSendSpam = new Date().getTime()}
    }
    else { Suser.GiftSendSpam = new Date().getTime()}

    let player = message.guild.member(message.mentions.users.last()) || message.guild.members.get(args[1]);
    if(!player)
    {
        return message.channel.send(`**Sender is not mentioned or is invalid**`)
    }
    else{
            Suser.GiftSenderID = message.author.id
            Suser.GiftReceiverID = player.id
            Suser.GiftSenderName = message.author.username
            Suser.GiftReceiverName = player.user.username
      
            
            let profileSender = await DBprofile.fetch(`TC_${Suser.GiftSenderID}`,{target : '.username'}) 
            let profileReceiver = await DBprofile.fetch(`TC_${Suser.GiftReceiverID}`,{target : '.username'}) 
            giftuserGift = await DBgift.fetch(`TC_${Suser.GiftReceiverID}`)
            if(!giftuserGift)   
            {
                  return message.channel.send(`**The person your sending to does not have a profile yet , ask them to type \`xprofile\`**`)
            }
            if(!profileReceiver) return message.channel.send(`**The person your sending to does not have a profile yet , ask them to type \`xprofile\`**`)
            if(!profileSender) return message.channel.send(`**You dont have a profile yet , type \`xprofile\`**`)
    }

    bot.Page = async (message, question, limit = 30000) => {
    const filter = m => m.author.id === message.author.id;
    await message.channel.send(question).then(msg => {msg.delete(32000)});
            try {
            const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
            return collected.first().content;
            } catch (e) {
            return false;
            }
    };

    bot.GiftPreviewEmbed = async (message,GiftID,GiftPage,GiftMessage,limit = 15000) => {
        const filter = m => m.author.id === message.author.id;

        GiftName = gift[GiftID[GiftPage-1]].name
        GiftURL = gift[GiftID[GiftPage-1]].url
        GiftCostCrystals = numberFormatter("#,##0.##", gift[GiftID[GiftPage-1]].cost)

        let GiftEmbedDiscord = new Discord.RichEmbed()
        .setAuthor('Gift Preview')
        .setTitle(`${GiftName}`)
        .addField('Message:',`*${GiftMessage}*`)
        .addField('Option:',`**Send To: ${Suser.GiftReceiverName}\nCost: 🔹${GiftCostCrystals}**\n\n*Type \`yes\` or \`y\` to send*\n*Type \`cancel\` or \`c\` to cancel*`)
        .setColor('#00cc66')
        .setImage(GiftURL)
        .setFooter('you have 15 secs to confirm your gift')

        message.channel.send(GiftEmbedDiscord).then(msg => {msg.delete(18000)})
        try {
        const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
        GiftPreviewEmbedReply = collected.first().content
        //message.channel.bulkDelete(collected)
        return GiftPreviewEmbedReply;
        } catch (e) {
        return false;
        }
    }

    bot.GiftImageEmbed = async (message,GiftID,GiftPage,limit = 30000) => {
        const filter = m => m.author.id === message.author.id;

        GiftName = gift[GiftID[GiftPage-1]].name
        GiftURL = gift[GiftID[GiftPage-1]].url

        let GiftMessageDiscord = `**Enter the Gift Message**\n*Max Limit 200 Characters!!*\n\`you have 30 secs to enter your message\``

        message.channel.send(GiftMessageDiscord).then(msg => {msg.delete(32000)})
        try {
        const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
        if(collected.first().content === 'cancel') return message.channel.send(textfile['QInventory'].exit)
        if(collected.first().content === false) return message.channel.send(textfile['QInventory'].NoEntry)
        GiftImageEmbedReply = collected.first().content
        //message.channel.bulkDelete(collected)
        return GiftImageEmbedReply;
        } catch (e) {
        return false;
        }
    }

    function emoji(id) {
        return bot.emojis.get(id).toString();
    }

    data = await DBprofile.fetch(`TC_${Suser.GiftSenderID}`)
    Blockdata = await DBgift.fetch(`TC_${Suser.GiftReceiverID}`,{target:`.Block`})
    BlockdataCheck = Object.keys(Blockdata);
    if(Blockdata[BlockdataCheck]===true) return message.channel.send(`**This user has blocked you from sending Gifts!!**`)
    GiftCrystalSenderData = data.crystals
    GiftSenderCrystals = numberFormatter("#,##0.##", GiftCrystalSenderData)
    CrystalGiftEmoji = emoji('661474074618363905') // Crystals Emoji

    GiftQmsg = '[Bro Gift is at 50% Discount]\n'
    var GiftID = Object.keys(gift)
    z=1;
    for(a in GiftID)
    {
        GiftCostCrystals = numberFormatter("#,##0.##", gift[GiftID[a]].cost)
        GiftQmsg = GiftQmsg + `${z++}. [${gift[GiftID[a]].name}](Cost: 🔹${GiftCostCrystals}) \n`
    }
    
    bot.GiftRun = async() => {
        GiftQpage = `**Gift Shop -- Your Balance ${CrystalGiftEmoji} ${GiftSenderCrystals}**\n\`\`\`md\nPick a gift by typing the number next to it\n========================\n\n`+GiftQmsg+`\n> Menu closes in 30 secs\`\`\``
        GiftPage = await bot.Page(message,GiftQpage)
        if(GiftPage === 'exit') return message.channel.send(textfile['QInventory'].exit)
        if(GiftPage === false) return message.channel.send(textfile['QInventory'].NoEntry)
        if(!(GiftPage>=1 && GiftPage<6)) return message.channel.send(textfile['QInventory'].InvalidEntry)

        GiftCostCrystalsCheck = gift[GiftID[GiftPage-1]].cost
        if(GiftCrystalSenderData<GiftCostCrystalsCheck) return message.channel.send(`**You do not have sufficient amount of Crystals ${CrystalGiftEmoji} **`)
        if(Suser.GiftSenderID===Suser.GiftReceiverID) return message.channel.send(`**You cannot send gifts to your self!!**`)
    
        var GiftMessage = await bot.GiftImageEmbed(message,GiftID,GiftPage)
        GiftMessageLengthCheck = GiftMessage.split('')
        GiftMessageLength = GiftMessageLengthCheck.length
        if(GiftMessageLength>200) return message.channel.send(`**Max Character Limit : 200\nGift Canceled!!** `)
        if(!GiftMessage) return message.channel.send(`No message was entered`)

        var GiftConfirmEmbed = await bot.GiftPreviewEmbed(message,GiftID,GiftPage,GiftMessage)
        if(GiftConfirmEmbed === false) return message.channel.send(textfile['QInventory'].NoEntry)
        if(GiftConfirmEmbed.toLowerCase() === 'y' || GiftConfirmEmbed.toLowerCase()  === 'yes')
        {
            try{
                CheckGiftProfile = await DBgift.fetch(`TC_${Suser.GiftReceiverID}`)
                GiftProfile = await DBgift.fetch(`TC_${Suser.GiftSenderID}`,{target:`.Gifts`})
                if(!CheckGiftProfile) return message.channel.send(`**The person your sending to does not have a profile yet , ask them to type \`xprofile\`**`)
                GiftProfile = await DBgift.fetch(`TC_${Suser.GiftReceiverID}`,{target:`.Gifts`})

                GiftFinalSenderName = Suser.GiftSenderName
                GiftFinalGiftID = gift[GiftID[GiftPage-1]].id
                GiftFinalMessage = GiftMessage
                GiftFinalTimeStamp = moment().format('ll')
                GiftFinalLength = CheckGiftProfile.giftIDcount
                GiftFinalCost = gift[GiftID[GiftPage-1]].cost
                GiftFinalName = gift[GiftID[GiftPage-1]].name

                await DBgift.set(`TC_${Suser.GiftReceiverID}`,GiftFinalSenderName,{target:`.Gifts.${GiftFinalLength}.SenderName`})
                await DBgift.set(`TC_${Suser.GiftReceiverID}`,GiftFinalGiftID,{target:`.Gifts.${GiftFinalLength}.GiftID`})
                await DBgift.set(`TC_${Suser.GiftReceiverID}`,GiftFinalMessage,{target:`.Gifts.${GiftFinalLength}.GiftMessage`})      
                await DBgift.set(`TC_${Suser.GiftReceiverID}`,GiftFinalTimeStamp,{target:`.Gifts.${GiftFinalLength}.TimeStamp`})           
                await DBgift.add(`TC_${Suser.GiftReceiverID}`,1,{target:`.giftcount`})
                await DBgift.add(`TC_${Suser.GiftReceiverID}`,1,{target:`.giftIDcount`})
                await DBgift.set(`TC_${Suser.GiftReceiverID}`,false,{target:`.giftReadStatus`})
                await DBprofile.subtract(`TC_${Suser.GiftSenderID}`,GiftFinalCost,{target:`.crystals`})
                console.log(`${Suser.GiftSenderName} sent a ${GiftFinalName} to ${Suser.GiftReceiverName}`) 
                Suser.BigGiftCount++
                try{
                    bot.fetchUser(`${Suser.GiftReceiverID}`,false).then(user => {user.send(`**You Have Received a Gift from \`${Suser.GiftSenderName}\` on \`${GiftFinalTimeStamp}\`**\n*Type \`${prefix}gift inbox\` to check your gifts inbox*\n***[Note: To stop TankiCrates from sending DM messages you can block TankiCrates BOT]***`,) })
                }
                catch(e){
                    message.channel.send(`**You Have Received a Gift from \`${Suser.GiftSenderName}\` on \`${GiftFinalTimeStamp}\`**\n*Type \`${prefix}gift inbox\` to check your gifts inbox*`)
                }
                message.channel.send(`**\`${Suser.GiftSenderName}\` , you have sent gift to \`${Suser.GiftReceiverName}\`**`)

            }catch(e){
                console.log(e)
                message.channel.send('Server Issue Please Try Again Later!!')
            }
        }
        else if(GiftConfirmEmbed === 'c' || GiftConfirmEmbed === 'cancel')
        {
            message.channel.send(`**Gift Canceled**`)
        }
        else{
            message.channel.send(`**Gift Canceled Invalid Input**`)
        } 
    }

    bot.GiftRun();

}
