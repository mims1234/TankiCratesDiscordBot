const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");

module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle) => {
    
    //if(message.author.id != '292675388180791297') return
    BuyUserID = message.author.id
    BuyNameID = message.author.username

    let textfile = JSON.parse(fs.readFileSync("TextFolder/TextFile.json","utf8"));
    let prefix = Prefix.prefix;

    messageArray = message.content.split(' ')
    Cont = messageArray[1]
    try{
        Cont =parseInt(Cont)
    } catch(e)
    {
        console.log(e)
        return message.channel.send(`**Use \`${prefix}buy\` <number of containers>**`)
    }
    if(!Cont || Cont<1) return message.channel.send(`**Use \`${prefix}buy\` <number of containers>**`)

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

    bot.confirmation = async (UserCry, message, question, limit = 30000) => {
    const filter = m => m.author.id === message.author.id;
    await message.channel.send(`**Shop Menu\n${BuyNameID} Crystals = `+UserCry+' '+CRYE+' **\n```md\n'+question+'```\n**Type `y` or `yes` to confirm your transaction**');
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

    Q = `#Confirmation-Message:\n====================\nDo you want to buy ${Cont} ${grammer} for ${CrystalsFormat} Crystals ?`
    
    if(UserCryA<Cost) return message.channel.send(`**You do not have sufficient amount of Crystals ${CRYE} **`)
    
    confirm = await bot.confirmation(UserCry,message, Q)
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

    function AddDiscout(total, percentage)
    {
        total = total - (total * (percentage/100))
        total = Math.round(total)
        return total
    }

    function Discounted(total, totalF ,percentage) {
        CrystalsFormat = numberFormatter("#,##0.##", total)
        OCrystalsFormat = numberFormatter("#,##0.##", totalF)
        return `<—❌${CrystalsFormat}❌ = ✅${OCrystalsFormat}✅ = ${percentage}% Discount—>`
    }

    function Normal(total) {
        total = Math.round(total)
        CrystalsFormat = numberFormatter("#,##0.##", total)
        return `<—✅${CrystalsFormat}✅—>`
    }


}
module.exports.help = {
    name : "buy",
    desc : "Purchase containers",
    aliases: "b"
}  