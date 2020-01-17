const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const BigSpams = require("../BigSpam.js");
const pre = require("../Auto_commands/prestigePOP.js");
const fs = require("fs");

module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift,DBserver) => {

    //if(message.author.id != '292675388180791297') return

    NOWTIME = Date.now()
    Z = 1

    let OpenUserID = message.author.id
    let OpenUserName = message.author.username
    let OpenGuildID = message.guild.id

    //Prestige %
    let PrestigeLevel = await DBprofile.fetch(`TC_${OpenUserID}`,{target : `.prestige`})
    let PrestigeTotalPaints = await DBprofile.fetch(`TC_${OpenUserID}`,{target : `.paints`})
    let PrestigeCheck = await DBidle.fetch(`TC_${OpenUserID}`,{target : `.Prestige`})

    CoolDown = async(PrestigeLevel) => {
        if(PrestigeLevel < 1) return 6
        if(PrestigeLevel === 1) return 5
        if(PrestigeLevel === 2) return 5
        if(PrestigeLevel === 3) return 4
        if(PrestigeLevel === 4) return 4
        if(PrestigeLevel === 5) return 3
        return 10
    }

    if(message.author.id != '292675388180791297')   spaminterval = await CoolDown(PrestigeLevel)
    else spaminterval = 1//await CoolDown(PrestigeLevel)

    let Suser = message.author
    //Big Cooldown
    if(Suser.LockCheck === true){BigSpam = 1800;BigSpamCheck = 180;} 
    else {BigSpam = 60;BigSpamCheck=0}
    let BigSpamCount = 40
    if (Suser.BigOpenCrate) {
        if(new Date().getTime() - Suser.BigOpenCrateSpamON < BigSpam*1000)
        {
            if(Suser.LockCheck===true) Suser.LockCheck = await BigSpams(bot,message,Suser.BigOpenCrateSpamON,BigSpam,1)
            else BigSpams(bot,message,Suser.BigOpenCrateSpamON,BigSpam,3)
            return;
        }
        else if (new Date().getTime() - Suser.BigOpenCrate < BigSpamCheck*1000) {
            if(Suser.OpenContainerCount>=BigSpamCount) {Suser.BigOpenCrateSpamON=new Date().getTime();}
        }
        else { Suser.BigOpenCrate = new Date().getTime();Suser.BigOpenCrateSpamON=null;Suser.OpenContainerCount=0;Suser.LockCheck=true}
    }
    else { Suser.BigOpenCrate = new Date().getTime();Suser.OpenContainerCount=0;Suser.LockCheck=true}

    //Normal Cooldown
    if (Suser.OpenCrate) {
        if (new Date().getTime() - Suser.OpenCrate < spaminterval*1000) {
            spams(message,Suser.OpenCrate,spaminterval)
            return;
        }
        else { Suser.OpenCrate = new Date().getTime()}
    }
    else { Suser.OpenCrate = new Date().getTime()}

    //JSON Reasources
    let prestigeData = JSON.parse(fs.readFileSync("DataBase/Prestige.json","utf8"));
    let container = JSON.parse(fs.readFileSync("DataBase/DB_ContainerDrops.json","utf8"));
    let paints = JSON.parse(fs.readFileSync("DataBase/DB_PaintID.json","utf8"));

    let profile = await DBprofile.fetch(`TC_${OpenUserID}`,{target : '.username'}) 
    if(!profile) return console.log('Error Profile Not created | '+OpenUserName)

    PrestigeCheckFucntion = async(PrestigeLevel,TotalPaints) => {
            if(PrestigeLevel === 0 && TotalPaints >= prestigeData[`data`].p1) return `prestige1`
            if(PrestigeLevel === 1 && TotalPaints >= prestigeData[`data`].p2) return `prestige2`
            if(PrestigeLevel === 2 && TotalPaints >= prestigeData[`data`].p3) return `prestige3`
            if(PrestigeLevel === 3 && TotalPaints >= prestigeData[`data`].p4) return `prestige4`
            if(PrestigeLevel === 4 && TotalPaints >= prestigeData[`data`].p5) return `prestige5`
            return null
    }

    if(PrestigeCheck != true)
    {
        let P = await PrestigeCheckFucntion(PrestigeLevel,PrestigeTotalPaints)
        if(P != null) return pre(bot,message,args,P,PrestigeLevel)
    }

    // C U R E L A
    PD = [1000,600,350,200,50,10,0]

    PD[0] = Prestige(PrestigeLevel,PD[0])
    PD[1] = Prestige(PrestigeLevel,PD[1])
    PD[2] = Prestige(PrestigeLevel,PD[2])
    PD[3] = Prestige(PrestigeLevel,PD[3])
    PD[4] = Prestige(PrestigeLevel,PD[4])
    PD[5] = Prestige(PrestigeLevel,PD[5])

    //Functions Initialized
    function Prestige(PrestigeLevel,PrestigeD)
    {
        if(PrestigeLevel < 1) { PrestigeD = Math.round((PrestigeD))}
        if(PrestigeLevel === 1) { PrestigeD = Math.round((PrestigeD/100) * 5) + PrestigeD}
        if(PrestigeLevel === 2) { PrestigeD = Math.round((PrestigeD/100) * 10) + PrestigeD}
        if(PrestigeLevel === 3) { PrestigeD = Math.round((PrestigeD/100) * 20) + PrestigeD}
        if(PrestigeLevel === 4) { PrestigeD = Math.round((PrestigeD/100) * 30) + PrestigeD}
        if(PrestigeLevel === 5) { PrestigeD = Math.round((PrestigeD/100) * 40) + PrestigeD}
        return PrestigeD
    }

    bot.StartOpening = async() => 
    {
        var pin = Crates(PD[0],'C',PD[1],'U',PD[2],'R',PD[3],'E',PD[4],'L',PD[5],'A',PD[6]);
        var PaintCount = Object.keys(container[pin])
        code = Math.floor(Math.random() * PaintCount.length)
        PaintID = PaintCount[code];
        HexID = HexColor(pin);
        Spin = SkinPin(PaintID)

        CheckPaint = await DBprofile.fetch(`TC_${OpenUserID}`,{target:`.Paints.${pin}.${PaintID}`})
        CheckSkin = await DBprofile.fetch(`TC_${OpenUserID}`,{target:`.Skins.${Spin}.${PaintID}`})

        if(PaintID.startsWith('TOP',2) === true)
        {
            if(CheckPaint != true)
            {
                Picker(PaintID,pin,HexID,PaintID,OpenUserID); 
            }
            else 
            {
                Z++
                bot.StartOpening();
            }
        }
        else if(PaintID.startsWith('SKN',2) === true)
        {
            if(CheckSkin != true)
            {
                Picker(PaintID,pin,HexID,PaintID,OpenUserID); 
            }
            else 
            {
                Z++
                bot.StartOpening();
            }
        }
        else
        {
            Picker(PaintID,pin,HexID,PaintID,OpenUserID); 
        }
    }

    bot.StartOpening()

    function Crates(R1,C1,R2,C2,R3,C3,R4,C4,R5,C5,R6,C6,MIN)
    {
        CODE = Math.floor(Math.random() * 1000)+1
        //console.log(`PIN = `+CODE)
        if(CODE<=R1 && CODE>R2) return C1
        if(CODE<=R2 && CODE>R3) return C2
        if(CODE<=R3 && CODE>R4) return C3
        if(CODE<=R4 && CODE>R5) return C4
        if(CODE<=R5 && CODE>R6) return C5
        if(CODE<=R5 && CODE>MIN) return C6
    }   

    function HexColor(pin)
    {
        if(pin === 'C') return '#FFFFFF'  //White
        if(pin === 'U') return '#64FF51'  //Green
        if(pin === 'R') return '#63a6ff'  //Blue
        if(pin === 'E') return '#C24CF8'  //Purple
        if(pin === 'L') return '#FCE826'  //Yellow
        if(pin === 'A') return '#FF0000'  //Red          LightPink #FFB9B9
        if(pin === 'P') return '#000000'  //Black 
    }

    function PaintTypePicker(PaintType)
    {
        if(PaintType === 'C') return PaintType = 'Common'
        if(PaintType === 'U') return PaintType = 'Uncommon'
        if(PaintType === 'R') return PaintType = 'Rare'
        if(PaintType === 'E') return PaintType = 'Epic'
        if(PaintType === 'L') return PaintType = 'Legendary'
        if(PaintType === 'A') return PaintType = 'Exotic'
    }

    function SkinLength(PaintID)
    {
        if(PaintID.startsWith('XT',5)) return 20
        if(PaintID.startsWith('LC',5)) return 6
        if(PaintID.startsWith('DC',5)) return 1
        if(PaintID.startsWith('PR',5)) return 8 
        if(PaintID.startsWith('UC',5)) return 3
    }

    function SkinPin(PaintID)
    {
        if(PaintID.startsWith('XT',5)) return 'XT'
        if(PaintID.startsWith('LC',5)) return 'LC'
        if(PaintID.startsWith('DC',5)) return 'DC'
        if(PaintID.startsWith('PR',5)) return 'PR' 
        if(PaintID.startsWith('UC',5)) return 'UC'
    }

    function SkinEmoji(PaintType)
    {
        if(PaintType === 'XT') return emoji('660510032642703390') // XT
        if(PaintType === 'LC') return emoji('660510032320004126') // Legacy
        if(PaintType === 'DC') return emoji('660510032206757958') // Demonic
        if(PaintType === 'PR') return emoji('660510032768532480') // Prime
        if(PaintType === 'UC') return emoji('660510032542302227') // Ultra
    }

    function SkinName(PaintType)
    {
        if(PaintType === 'XT') return `XT`
        if(PaintType === 'LC') return `Legacy`
        if(PaintType === 'DC') return `Demonic`
        if(PaintType === 'PR') return `Prime`
        if(PaintType === 'UC') return `Ultra`
    }

    function PaintLength(PaintType)
    {
        //if(PaintType === 'C') return 10
        if(PaintType === 'U') return 10
        if(PaintType === 'R') return 10
        if(PaintType === 'E') return 10
        if(PaintType === 'L') return 5
        if(PaintType === 'A') return 5
    }

    function RandomScore(pin)
    {
        if(pin === 'C') return Math.floor(Math.random() * 2) + 1
        if(pin === 'U') return Math.floor(Math.random() * 2) + 3
        if(pin === 'R') return Math.floor(Math.random() * 2) + 5
        if(pin === 'E') return Math.floor(Math.random() * 2) + 7
        if(pin === 'L') return Math.floor(Math.random() * 2) + 9
        if(pin === 'A') return Math.floor(Math.random() * 2) + 11
    }

    function emoji(id) {
        return bot.emojis.get(id).toString();
    }

    function Picker(PaintID,pin,HexID,PaintID,OpenUserID)
    {
        PaintType = PaintTypePicker(pin)
        val = 0

        if(PaintID.startsWith('TOP',2))
        {
            PaintName = paints[PaintID].Name
            PaintURL = paints[PaintID].URL
        }
        else if(PaintID.startsWith('SKN',2))
        {
            PaintName = paints[PaintID].Name
            PaintURL = paints[PaintID].URL
        }
        else
        {
            if(PaintID.startsWith('Y1',4)){ val = 1000; PaintURL = "https://i.imgur.com/Ip5cPMo.png"; PaintName = 'Crystals' }
            if(PaintID.startsWith('Y2',4)){  val = 2500; PaintURL = "https://i.imgur.com/fRKio5C.png"; PaintName = 'Crystals' }
            if(PaintID.startsWith('Y3',4)){  val = 10000; PaintURL = "https://i.imgur.com/EKs51aa.png"; PaintName = 'Crystals' }
            if(PaintID.startsWith('Y4',4)){  val = 50000; PaintURL = "https://i.imgur.com/HXpwqsq.png"; PaintName = 'Crystals' }
            if(PaintID.startsWith('Y5',4)){  val = 200000; PaintURL = "https://i.imgur.com/mJrEgUD.png"; PaintName = 'Crystals' }
            if(PaintID.startsWith('Y6',4)){  val = 500000; PaintURL = "https://i.imgur.com/TfFqFeS.png"; PaintName = 'Crystals' }
            if(PaintID.startsWith('P1',4)){  val = 50; PaintURL = "https://i.imgur.com/1VpyV59.png"; PaintName = 'Supplies' }
            if(PaintID.startsWith('P2',4)){  val = 200; PaintURL = "https://i.imgur.com/1d2heK9.png"; PaintName = 'Supplies' }
            if(PaintID.startsWith('P3',4)){  val = 500; PaintURL = "https://i.imgur.com/Gp9zsfV.png"; PaintName = 'Supplies' }
            if(PaintID.startsWith('P4',4)){  val = 1000; PaintURL = "https://i.imgur.com/hMpm62n.png"; PaintName = 'Supplies' }
        }

        bot.UserData = async (PaintID, PaintName, PaintType, HexID, OpenUserID, val, pin) => {

            data =  await DBprofile.fetch(`TC_${OpenUserID}`)
            score = RandomScore(pin)
            OpenGiftCheckAction=true
            OpenGiftCheck = await DBgift.fetch(`TC_${OpenUserID}`,{target:`.giftReadStatus`})
            if(OpenGiftCheck===false) OpenGiftCheckAction = false
            UserContainers = data.containers
            if(UserContainers>0)
            {
                if(PaintID.startsWith('CRY',2))
                {  
                    await DBprofile.add(`TC_${OpenUserID}`,val,{target: `.crystals`})

                    crystals = await DBprofile.fetch(`TC_${OpenUserID}`,{target : `.crystals`})
                    crystals = numberFormatter("#,##0.##", crystals)
                    val = numberFormatter("#,##0.##", val)

                    text1 = `Congratulations , You got ${val} ${PaintName}`
                    text3 = `**You now have ${crystals} Crystals**`
                }
                if(PaintID.startsWith('SUP',2))
                {   
                    await DBprofile.add(`TC_${OpenUserID}`,val,{target: `.supplies`})

                    supplies = await DBprofile.fetch(`TC_${OpenUserID}`,{target : `.supplies`})
                    supplies = numberFormatter("#,##0.##", supplies);
                    val = numberFormatter("#,##0.##", val) 

                    text1 = `Congratulations! You won ${val} ${PaintName}`
                    text3 = `**You now have ${supplies} Supplies**`
                }
                if(PaintID.startsWith('TOP',2))
                {
                    await DBprofile.set(`TC_${OpenUserID}`,true,{target:`.Paints.${pin}.${PaintID}`})
                    await DBprofile.add(`TC_${OpenUserID}`,1,{target: `.total${pin}`})
                    await DBprofile.add(`TC_${OpenUserID}`,1,{target: `.paints`})

                    text1 = `Congratulations! You won ${PaintName} Paint`

                    PF = PaintLength(pin)
                    var PaintCountF = Object.keys(container[pin])
                  
                    AMOUNTObject = await DBprofile.fetch(`TC_${OpenUserID}`,{target:`.Paints.${pin}`})
                    AMOUNT = Object.keys(AMOUNTObject).length
                  
                    text3 = `**You now have ${AMOUNT} out of ${PaintCountF.length - PF} ${PaintType} Paints**`
                }

                else if(PaintID.startsWith('SKN',2))
                {
                    Spin = SkinPin(PaintID)
                    SF = SkinLength(PaintID)
                    SN = SkinName(Spin)
                    SE = SkinEmoji(Spin)

                    await DBprofile.set(`TC_${OpenUserID}`,true,{target:`.Skins.${Spin}.${PaintID}`})
                    await DBprofile.add(`TC_${OpenUserID}`,1,{target: `.total${Spin}`})
                    await DBprofile.add(`TC_${OpenUserID}`,1,{target: `.skins`})

                    text1 = `Congratulations! You won ${PaintName} Skin`

                    AMOUNTObject = await DBprofile.fetch(`TC_${OpenUserID}`,{target:`.Skins.${Spin}`})
                    AMOUNT = Object.keys(AMOUNTObject).length
                  
                    text3 = `**You now have ${AMOUNT} out of ${SF} ${SN} Skins ${SE}**`
                }

                await DBprofile.subtract(`TC_${OpenUserID}`,1,{target: `.containers`})
                await DBprofile.add(`TC_${OpenUserID}`,score,{target: `.score`})
                A = await DBserver.add(`TC_${OpenGuildID}_${OpenUserID}`,score,{target: `.score`})
                console.log(A)
                Suser.OpenContainerCount++
                text2 = `${PaintType}`
                
                UserIcon = message.author.displayAvatarURL

                ENDTIME = Date.now()
                DURATION = ENDTIME - NOWTIME
                DurationToOpen = `${DURATION/1000} ms`

                    let newEmbed = new Discord.RichEmbed()
                    .setAuthor(message.author.username + `'s container :`,UserIcon)
                    .setImage(PaintURL)
                    .setColor(HexID)
                    .addField(text1,text3)
                    .setImage(PaintURL)
                    .setFooter(text2 + `  +${score} XP`)

                    if(PrestigeCheck === true)
                    {
                        let newEmbed1 = new Discord.RichEmbed()
                        .setAuthor(message.author.username + ` Container`,UserIcon)
                        .setColor(HexID)
                        .addField(text1,text3+`\n- - - - - - - - - - - - - - - - - - - - - - - - - - -`)
                        .addField(`:star: Prestige Option Available :star:`,`- - - - - - - - - - - - - - - - - - - - - - - - - - -`)
                        .setImage(PaintURL)
                        .setFooter(text2 + ` -- ${DurationToOpen}`)

                        message.channel.send(newEmbed1)
                    }
                    else if(OpenGiftCheckAction === false)
                    {
                        let newEmbed1 = new Discord.RichEmbed()
                        .setAuthor(message.author.username + ` Container`,UserIcon)
                        .setColor(HexID)
                        .addField(`:star: You Have Recieved Gift :star:`,`Type \`${Prefix.prefix}gift inbox\` to view your gifts`)
                        .addField(text1,text3)
                        .setImage(PaintURL)
                        .setFooter(text2 + `  +${score} XP`)
                        message.channel.send(newEmbed1)
                    }
                    else
                    {
                        message.channel.send(newEmbed)
                    }

                    console.log(`PaintID : ${PaintID}`)
                    console.log(`Looping Lottery : ${Z}`)

            }
            else {return message.channel.send(`\\❌**You do not have sufficient Containers**\\❌`)}
        };

    bot.UserData(PaintID, PaintName, PaintType , HexID, OpenUserID , val, pin)
    }
}
module.exports.help = {
    name : "open",
    desc : "Open to win awesome Paints",
    aliases: "o"
}