const Prefix = require("../prefix.json");
const Discord = require("discord.js");

module.exports = async (bot,message,args,DBguildSetting) => {

    GiftHelpUserID = message.author.id 
    GiftHelpUserName = message.author.username

    let Customprefix = await DBguildSetting.fetch(`TC_${GuildID}`,{target:`.prefix`})
    if(Customprefix === null || Customprefix === undefined) Customprefix = Prefix.prefix

    msgHead = `Commands: `
    msg = ''
    msg = msg + ` \`${Customprefix}bot invite\`  **Link to invite Bot**`
    msg = msg + `\n \`${Customprefix}bot server\` **Link to Bot Official Server**`
    msg = msg + `\n \`${Customprefix}bot vote\` **Link to VOTE for Bot**`
    msg = msg + `\n \`${Customprefix}bot prefix\` **Set custom-prefix for server**`
    msg = msg + `\n \`${Customprefix}bot ping\` **Bot Latentcy or Ping**`

    GiftHelpEmbed = new Discord.RichEmbed()
    .setTitle(`General Commands`)
    .setColor(`#FF00AA `)
    .addField(`${msgHead}`,`${msg}`)

    message.channel.send(GiftHelpEmbed)
}
