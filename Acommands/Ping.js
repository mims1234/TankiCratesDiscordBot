const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");

module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle) => {
    
    let Suser = message.author
    let spaminterval = 1
        if (Suser.Ping) {
            if (new Date().getTime() - Suser.Ping < spaminterval*1000) {
                spams(message,Suser.Ping,spaminterval)
                return;
            }
            else { Suser.Ping = new Date().getTime()}
        }
        else { Suser.Ping = new Date().getTime()}

    Ping = Math.round(parseInt(bot.ping))
    message.channel.send(`**\`${Ping} ms\` ❕**`);

}
module.exports.help = {
    name : "ping",
    aliases: "pong"
}