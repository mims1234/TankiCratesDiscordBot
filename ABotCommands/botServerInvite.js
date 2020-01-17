const Discord = require("discord.js");

module.exports = async (bot,message,args) => {

    invite_link = `https://discord.gg/gghhnvv`

    let channel_embed = new Discord.RichEmbed()
    .setAuthor('Bot server-link sent to your DM')
    .setColor('#FF2200')

    message.channel.send(channel_embed)

    try{
        message.author.send(`${invite_link}`)
    } catch(e){
        message.channel.send(`${invite_link}`)
    }
    console.log(`${message.author.username} Requested Bot Server-Link`)
}
