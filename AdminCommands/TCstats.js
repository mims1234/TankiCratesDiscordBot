const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const moment = require("moment")
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");

module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift,DBserver) => {

    if(message.author.id != '292675388180791297') return
    AdminGuildID = message.guild.id
    MemberListGA = []
    OverallCrystals = 0
    OverallSupplies = 0
    OverallContainers = 0
    OverallScores = 0

    A = await DBprofile.startsWith(`TC`,{target:`.data`}).then(resp=>{
        TotalPlayers = resp.length
        for(a in resp)
        {
            if(resp[a].data.crystals) OverallCrystals+= resp[a].data.crystals
            if(resp[a].data.supplies) OverallSupplies+= resp[a].data.supplies
            if(resp[a].data.containers) OverallContainers+= resp[a].data.containers
            if(resp[a].data.score) OverallScores+= resp[a].data.score
        }

        TotalPlayers = numberFormatter("#,##0.##", TotalPlayers);
        OverallCrystals = numberFormatter("#,##0.##", OverallCrystals);
        OverallSupplies = numberFormatter("#,##0.##", OverallSupplies);
        OverallContainers = numberFormatter("#,##0.##", OverallContainers);
        OverallScores = numberFormatter("#,##0.##", OverallScores);

        function emoji(id) {
            return bot.emojis.get(id).toString();
    }

    TANE = emoji('665108249833504798') // Tankicoins
    CRYE = emoji('661474074618363905') // Crystals
    CONE = emoji('661473896591130625') // Container
    SUPE = emoji('661473925812977664') // Supplies
    SKNE = emoji('661475345333223444') // Skins
    PANE = emoji('661475317801812008') // Paints

    SCE = emoji('661477110518513674') // Score
    ACE = emoji('661477110598336512') // Achievements
    LVE = emoji('661477111038738432') // Level
    PSE = emoji('661477110749331466') // Prestige

        let Gstats = new Discord.RichEmbed()
        .setTitle('TankiCrates Database Stats')
        .addField('**Total Players**',`***${TotalPlayers}***`)
        .setColor(`#FE00FF`)
        .addField('Overall Stats',`
**${CRYE} Crystals :** *${OverallCrystals}*      
**${SUPE} Supplies :** *${OverallSupplies}*   
**${CONE} Containers :** *${OverallContainers}*   
**${SCE} Scores :** *${OverallScores}*   
        `)
        .setFooter(`${moment().format('ll')}`)

        message.channel.send(Gstats)
    })


}
module.exports.help = {
    name : "statsTC",
    aliases: "stc"
}