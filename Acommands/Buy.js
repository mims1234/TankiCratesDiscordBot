const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");

module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift,DBserver) => {
    
    //if(message.author.id != '292675388180791297') return
    BuyUserID = message.author.id
    BuyNameID = message.author.username
    BuyUserIcon = message.member.user.avatarURL

    let textfile = JSON.parse(fs.readFileSync("TextFolder/TextFile.json","utf8"));
    let prefix = Prefix.prefix;

    messageArray = message.content.split(' ')
    Cont = messageArray[1]
    try{
        Cont =parseInt(Cont)
    } catch(e)
    {
        console.log(e)
        return message.channel.send(`:information_source: | **INFORMATION**\n**Make sure you mention number of containers after ${prefix}buy ** \n:ballot_box_with_check: | ***Usage :*** \`${prefix}buy <number-of-containers>\` \n:white_check_mark: |  ***Example :*** \`${prefix}buy 5\``)
    }
    if(!Cont || Cont<1) return message.channel.send(`:information_source: | **INFORMATION**\n**Make sure you mention number of containers after ${prefix}buy ** \n:ballot_box_with_check: | ***Usage :*** \`${prefix}buy <number-of-containers>\` \n:white_check_mark: |  ***Example :*** \`${prefix}buy 5\``)

    let Suser = message.author
    let spaminterval = 10
        if (Suser.BuySpam) {
            if (new Date().getTime() - Suser.BuySpam < spaminterval*1000) {
                spams(message,Suser.BuySpam,spaminterval)
                return;
            }
            else { Suser.BuySpam = new Date().getTime()}
        }
        else { Suser.BuySpam = new Date().getTime()}

    let profile = await DBprofile.fetch(`TC_${BuyUserID}`,{target : '.username'}) 
    if(!profile) return message.channel.send(`**${BuyNameID} Profile Doesnt Exist !!**`)

    function emoji(id) {
        return bot.emojis.get(id).toString();
    }

    CRYE = emoji('661474074618363905') // Crystals
    CONE = emoji('661473896591130625') // Container
    USEREMOTE = emoji(`476438415848505357`) //User

    bot.confirmation = async (UserCry, message, Q1,Q2, limit = 30000) => {
    const filter = m => m.author.id === message.author.id;
    BUYEMBED = new Discord.RichEmbed()
    .setThumbnail(`https://i.imgur.com/KFDpqiM.jpg`)
    .setAuthor(BuyNameID+` Purchase`,BuyUserIcon)
    .setTitle(`Your Crystals = **${UserCry}** ${CRYE}`)
    .addField(`${Q1}`,`${Q2}`)
    .setFooter(`Type \"yes\" to confirm your transaction`)
    .setColor(`#FE0000`)
    await message.channel.send(BUYEMBED)
    try {
        const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
        return collected.first().content;
        } catch (e) {
        return false;
        }
    };

    UserCryA = await DBprofile.fetch(`TC_${BuyUserID}`,{target: `.crystals`})
    UserCry = numberFormatter("#,##0.##", UserCryA);
    Cost = Cont*1000;
    CrystalsFormat = numberFormatter("#,##0.##", Cost);

    if(Cont > 1) grammer = `Containers`
    else grammer = `Container`

    Q1 = `Confirmation-Message:`
    Q2 = `***Do you want to buy ${Cont} ${CONE} for ${CrystalsFormat} ${CRYE} ?***`

    let LOWBAL = new Discord.RichEmbed()
    .setAuthor(BuyNameID+` Crystals`,BuyUserIcon)
    .setDescription(`**You do not have sufficient amount of Crystals**`)
    .addField(`Balance:`,`***${UserCry}*** ${CRYE}`)
    .setColor(`#FE0000`)
    .setThumbnail(`https://s.eu.tankionline.com/0/16722/365/320/26561564032213/image.webp`)
    .setFooter(`${prefix}open to earn more Crystals`)
    
    if(UserCryA<Cost) return message.channel.send(LOWBAL)
    
    confirm = await bot.confirmation(UserCry,message, Q1,Q2)
    if(confirm === false) return message.channel.send(textfile['QPaintWiki'].NoEntry)
    confirm = confirm.toLowerCase()

    if(confirm === 'y' || confirm === 'yes') 
    {
        await DBprofile.subtract(`TC_${BuyUserID}`,Cost,{target: `.crystals`})
        await DBprofile.add(`TC_${BuyUserID}`,Cont,{target: `.containers`})
        message.channel.send(`\`✔️\`**Transaction Successful**\`✔️\`\nYou have brought **__${Cont} __** ${grammer} ${CONE} for **__${CrystalsFormat}__** Crystals ${CRYE}`)
        console.log(`${BuyNameID} Purchased ${Cont} ${grammer} for ${CrystalsFormat}`)
    }
    else
    {
        return message.channel.send(`\`❌\`**Transaction Canceled**\`❌\``)
    }

}
module.exports.help = {
    name : "buy",
    desc : "Purchase containers",
    aliases: "b"
}