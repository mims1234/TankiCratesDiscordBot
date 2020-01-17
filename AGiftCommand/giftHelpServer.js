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
    msg = msg + `\`${Customprefix}gift send @mention\` **Send Gift to @mention**`
    msg = msg + `\n \`${Customprefix}gift inbox\`  **Check your Gift Inbox** :star:`
    msg = msg + `\n \`${Customprefix}gift inbox del <gift-number>\` **Delete Gift from Inbox** :star:`
    msg = msg + `\n \`${Customprefix}gift block list\` **Block List** :star:`
    msg = msg + `\n \`${Customprefix}gift block @mention\`  **Block @mention**`
    msg = msg + `\n \`${Customprefix}gift unblock @mention\`  **Unblock @mention**`

    GiftHelpEmbed = new Discord.RichEmbed()
    .setFooter(`Requested by ${GiftHelpUserName}`)
    .setTitle(`Gift Commands`)
    .setColor(`#FF00AA `)
    .addField(`${msgHead}`,`${msg}`)
    .addField(`:star:  Commands`,`**The commands with this symbol can be used at TankiCrates direct-message (DM) as well**`)

    message.channel.send(GiftHelpEmbed)
}
