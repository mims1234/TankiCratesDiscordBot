const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");


module.exports.run = async (bot,message,args) => {
  
      let Suser = message.author
      let spaminterval =2
        if (Suser.Invite) {
            if (new Date().getTime() - Suser.Invite < spaminterval*1000) {
                spams(message,Suser.Invite,spaminterval)
                return;
            }
            else { Suser.Invite = new Date().getTime()}
        }
        else { Suser.Invite = new Date().getTime()}

    invite_link = `https://discordapp.com/oauth2/authorize?client_id=459815599770697749&permissions=1074128960&scope=bot`
    
    let channel_embed = new Discord.RichEmbed()
    .setAuthor('Bot link sent to your DM')
    //.setTitle('Bot link send to your DM')
    .setColor('#FF2200')

    message.channel.send(channel_embed)

    let embed = new Discord.RichEmbed()
    .setAuthor('Bot Invite')
    .setTitle('Click here to Invite TankiCrates BOT to your Server')
    .setThumbnail(bot.user.avatarURL)
    .setColor('#FF2200')
    .setURL(invite_link)

    message.author.send(embed)
  
    console.log(`---- BOT-LINK----`)
}
module.exports.help = {
    name : "invite",
    desc : "Bot Invite Link"
}
