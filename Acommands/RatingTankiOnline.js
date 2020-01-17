const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter");
const superagent = require("superagent");
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");


module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift,DBserver) => {

    let textfile = JSON.parse(fs.readFileSync("TextFolder/TextFile.json","utf8"));
    let ranks = JSON.parse(fs.readFileSync("DataBase/Rating.json","utf8"));
    prefix = Prefix.prefix

    let Suser = message.author
    let spaminterval =3
        if (Suser.StartCheck) {
            if (new Date().getTime() - Suser.StartCheck < spaminterval*1000) {
                spams(message,Suser.StartCheck,spaminterval)
                return;
            }
            else { Suser.StartCheck = new Date().getTime()}
        }
        else { Suser.StartCheck = new Date().getTime()}


    let R = ranks["Ranks"]
    let T = ranks["Logo"]

    user = args[0]
    if(!user) return message.channel.send(`:information_source: | **INFORMATION**\n**Make sure you don't leave more than one space after ${prefix}rating ** \n:ballot_box_with_check: | ***Usage :*** \`${prefix}rating <nickname>\` \n:white_check_mark: |  ***Example :*** \`${prefix}rating MiMs\``)

      // try{
            LINK = `https://ratings.tankionline.com/api/eu/profile/?user=${user}&lang=en`
            UserLINK = `https://ratings.tankionline.com/en/user/${user}`

            let {body} = await superagent
            .get(LINK)
            try{

            NICKNAME = body.response.name
            Rank = parseInt(body.response.rank)
            Deaths = parseInt(body.response.deaths)
            Kills = parseInt(body.response.kills)
            EFF = Math.round(parseInt(body.response.rating.efficiency.value)/100)
            EXP = parseInt(body.response.score)
            GOLDS = parseInt(body.response.caughtGolds)
            KD = numberFormatter("#,##0.##", Kills/Deaths);
            TimePlayed = 0

            if(Deaths <= 0) Deaths = 0
            else Deaths = numberFormatter("#,###.##", Deaths);
            if(Kills <= 0) Kills = 0
            else Kills = numberFormatter("#,###.##", Kills);
            if(EXP <= 0) EXP = 0
            else EXP = numberFormatter("#,###.##", EXP);
            if(EFF <= 0) EFF = 0
            else EFF = numberFormatter("#,###.##", EFF);
            if(GOLDS <= 0) GOLDS = 0
            else GOLDS = numberFormatter("#,###.##",GOLDS)

            //TimePlayed
            for(i=0;i<body.response.modesPlayed.length;i++)
            {
                TimePlayed = TimePlayed + parseInt(body.response.modesPlayed[i].timePlayed)
            }
            TimePlayed = Math.round(TimePlayed/(1000*60*60))
            if(TimePlayed != 0) TimePlayed = numberFormatter("###,###.##", TimePlayed)
            else TimePlayed = 0

            if(Rank>30)
            {
                LR = Rank - 30
                Rank = `R31`
                RankName = `${R[`${Rank}`].Name} ${LR}`
            } 
            else 
            {
                Rank = `R${Rank}`
                RankName = `${R[`${Rank}`].Name}`
            }

            URL = `${R[`${Rank}`].URL}`
            ICON = `${T.URL}`

            let embed = new Discord.RichEmbed()
            .setAuthor('Tankionline Rating',ICON)
            .setTitle(`Nickname : ${NICKNAME}`)
            .setColor('#42f598')
            .setThumbnail(URL)
            .addField('Stats :',`
**Rank : ** *${RankName}*
**Experience :** *${EXP}*
**Efficiency :** *${EFF}*
**Gear Score :** *${body.response.gearScore}*
**Time Played : ** *${TimePlayed} Hrs*
**Golds Caught : ** *${GOLDS}*
**Kills :** *${Kills}*
**Deaths :** *${Deaths}*
**K/D :** *${KD}*`)
            .setURL(UserLINK);
    
            message.channel.send(embed)
       }
        catch(e)
       {
           message.channel.send(' :exclamation: |  **Nickname doesnt exist , Please Check the entered nickname**')
       }

}
module.exports.help = {
    name : "rating",
    aliases:"ratings"
}