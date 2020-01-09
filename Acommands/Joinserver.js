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
        if (Suser.joinServer) {
            if (new Date().getTime() - Suser.joinServer < spaminterval*1000) {
                spams(message,Suser.joinServer,spaminterval)
                return;
            }
            else { Suser.joinServer = new Date().getTime()}
        }
        else { Suser.joinServer = new Date().getTime()}
  
    invite_link = `https://discord.gg/gghhnvv`

    let channel_embed = new Discord.RichEmbed()
    .setAuthor('Bot Server link sent to your DM')
    //.setTitle('Bot link send to your DM')
    .setColor('#22FF00')

    message.channel.send(channel_embed)

    message.author.send(`${invite_link}`)
}
module.exports.help = {
    name : "joinserver",
    desc : "Bot Server Link"
}
