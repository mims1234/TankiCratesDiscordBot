const Discord = require("discord.js");

module.exports = async (bot,message,args) => {

    invite_link = `https://discordapp.com/oauth2/authorize?client_id=459815599770697749&permissions=1074128960&scope=bot`

    let channel_embed = new Discord.RichEmbed()
    .setAuthor('Bot invite-link sent to your DM')
    .setColor('#FF2200')

    message.channel.send(channel_embed)

    let embed = new Discord.RichEmbed()
    .setAuthor('Bot Invite')
    .setTitle('Click here to Invite TankiCrates BOT to your Server')
    .setThumbnail(bot.user.avatarURL)
    .setColor('#FF2200')
    .setURL(invite_link)

    try{
        message.author.send(embed)
    } catch(e){
        message.channel.send(embed)
    }
    console.log(`${message.author.username} Requested Bot Invite-Link`)
}
