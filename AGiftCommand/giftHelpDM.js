const Prefix = require("../prefix.json");
const Discord = require("discord.js");


module.exports = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift) => {

    prefix = Prefix.prefix
    GiftHelpUserID = message.author.id 
    GiftHelpUserName = message.author.username

    let Customprefix = await DBguildSetting.fetch(`TC_${GuildID}`,{target:`.prefix`})
    if(Customprefix === null || Customprefix === undefined) Customprefix = Prefix.prefix

    msgHead = `Commands: `
    msg = ''
    msg = msg + ` \`${Customprefix}gift inbox\`  **Check your Gift Inbox**`
    msg = msg + `\n \`${Customprefix}gift inbox del <gift-number>\` **Delete Gift from Inbox**`
    msg = msg + `\n \`${Customprefix}gift block list\` **Block List**`

    GiftHelpEmbed = new Discord.RichEmbed()
    .setTitle(`Gift Commands`)
    .setColor(`#FF00AA `)
    .addField(`${msgHead}`,`${msg}`)

    message.channel.send(GiftHelpEmbed)
}
