const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const moment = require("moment")
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");

module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting) => {

    //if(message.author.id != '292675388180791297') return
    if(message.author.id != '292675388180791297')
    {
        spaminterval = 5
    }
    else{
        spaminterval = 0
    }

    let prefix = Prefix.prefix;

    code = args[0]
    if(!code) return message.channel.send(`**Use \`${prefix}prefix\` set <custome-prefix> | view**`)

    let Suser = message.author
    if (Suser.Prefix) {
        if (new Date().getTime() - Suser.Prefix < spaminterval*1000) {
            spams(message,Suser.Prefix,spaminterval)
            return;
        }
        else { Suser.Prefix = new Date().getTime()}
    }
    else { Suser.Prefix = new Date().getTime()}

    code = code.toLowerCase()
    switch(code)
    {
        case "set":     GuildID = message.guild.id
                        GuildName = message.guild.name
                        NewPrefix = args[1]
                    
                        if(!message.member.hasPermission("ADMINISTRATOR")) return 
                        if(!NewPrefix) return message.channel.send('**No Prefix Not mentioned !!**');
                        if(NewPrefix.length>2) return message.channel.send('**Prefix too Long !! max length 2**');
                    
                        await DBguildSetting.set(`TC_${GuildID}`,NewPrefix,{target:`.prefix`})
                    
                        message.channel.send(`**Custom-Prefix Set as \`${NewPrefix}\` for \`${GuildName}\` server !!**`)

        break;

        case "view":        GuildID = message.guild.id
                            GuildName = message.guild.name
                        
                            data =  await DBguildSetting.fetch(`TC_${GuildID}`)
                        
                            if(data!=undefined || data !=null){
                                NewPrefix = data.prefix;
                                message.channel.send(`**\`${NewPrefix}\` is Custom-Prefix for \`${GuildName}\` server**`)
                            }
                            else
                            {
                                message.channel.send(`**No Custom Prefix set for \`${GuildName}\`**`);
                            }
        break;

        default:            return message.channel.send(`**Use \`${prefix}prefix\` set <custom-prefix> | view**`)
    }

}
module.exports.help = {
    name : "prefix",
    desc : "Set and View Custom Prefix"
}