const Prefix = require("../prefix.json");
const Discord = require("discord.js");

module.exports = async (bot,message,args,DBguildSetting ) => {

    prefix = Prefix.prefix
    GiftHelpUserID = message.author.id 
    GiftHelpUserName = message.author.username

    let Customprefix = await DBguildSetting.fetch(`TC_${GuildID}`,{target:`.prefix`})
    if(Customprefix === null || Customprefix === undefined) Customprefix = Prefix.prefix

    msgHead = `Commands: `
    msg = ''
    msg = msg + ` \`${Customprefix}top global crystals\`  **Global Top Crystals**`
    msg = msg + ` \n \`${Customprefix}top global scores\`  **Global Top Scores**`
    msg = msg + ` \n \`${Customprefix}top global supplies\`  **Global Top Supplies**`
    msg = msg + ` \n \`${Customprefix}top server\`  **Server Top Scores**`

    GiftHelpEmbed = new Discord.RichEmbed()
    .setTitle(`Leaderboard Commands`)
    .setColor(`#FF00AA `)
    .addField(`${msgHead}`,`${msg}`)

    message.channel.send(GiftHelpEmbed)
}
