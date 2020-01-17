const Discord = require("discord.js");

module.exports = async (bot,message,args) => {

    invite_link = `https://top.gg/bot/459815599770697749/vote`
    let channel_embed = new Discord.RichEmbed()
    .setAuthor('Bot vote-link sent to your DM')
    .setColor('#FF2200')
    message.channel.send(channel_embed)

    let embed = new Discord.RichEmbed()
    .setAuthor('Bot Invite')
    .setTitle('Click here to Vote for TankiCrates Discord Bot')
    .setThumbnail(bot.user.avatarURL)
    .setColor('#FF2200')
    .setURL(invite_link)

    try{
        message.author.send(embed)
    } catch(e){
        message.channel.send(embed)
    }
    console.log(`${message.author.username} Requested Bot Vote-Link`)
}

