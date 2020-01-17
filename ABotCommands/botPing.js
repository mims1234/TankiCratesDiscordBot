const Discord = require("discord.js");

module.exports = async (bot,message,args) => {
    
    Ping = Math.round(parseInt(bot.ping))
    message.channel.send(`📡 | **Opening Containers at \`${Ping} ms\` ❕**`);
    console.log(`${message.author.username} Requested Bot Ping`)
}
