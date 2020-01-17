const Prefix = require("../prefix.json");
const spams = require("../spams.js");

module.exports = async (bot,message,args,DBguildSetting) => {

    let prefix = Prefix.prefix;
    code = args[1]
    if(!code) return message.channel.send(`**Usage:** \n\`${prefix}bot prefix set <custom-prefix>\`\n\`${prefix}bot prefix view\``)
    code = code.toLowerCase()
    switch(code)
    {
        case "set":     GuildID = message.guild.id
                        GuildName = message.guild.name
                        NewPrefix = args[2]
                    
                        if(!message.member.hasPermission("ADMINISTRATOR")) return 
                        if(!NewPrefix) return message.channel.send('**No Prefix Not mentioned !!**');
                        if(NewPrefix.length>2) return message.channel.send('**Prefix too Long !! max length 2**');
                        await DBguildSetting.set(`TC_${GuildID}`,NewPrefix,{target:`.prefix`})
                        message.channel.send(`**Custom-Prefix Set as \`${NewPrefix}\` for \`${GuildName}\` server !!**`)
                        console.log(`${message.author.username} has set new prefix ${NewPrefix} at ${GuildName} Server`)
        break;
        case "view":    GuildID = message.guild.id
                        GuildName = message.guild.name
                        data =  await DBguildSetting.fetch(`TC_${GuildID}`)
                        if(data!=undefined || data !=null){
                            NewPrefix = data.prefix;
                            message.channel.send(`**\`${NewPrefix}\` is Custom-Prefix for \`${GuildName}\` server**`)
                            console.log(`${message.author.username} viewed prefix ${NewPrefix} of ${GuildName} Server`)
                        }
                        else{
                            message.channel.send(`**No Custom Prefix set for \`${GuildName}\`**`);
                            console.log(`${message.author.username} viewed prefix Not set at ${GuildName} Server`)
                        }
                
        break;
        default:        return message.channel.send(`**Usage:** \n\`${prefix}bot prefix set <custom-prefix>\`\n\`${prefix}bot prefix view\``)
    }

}
