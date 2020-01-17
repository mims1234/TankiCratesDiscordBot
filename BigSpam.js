const fs = require("fs");
const Prefix = require("./prefix.json");
module.exports = async (bot,message,Suser,spaminterval,type) => { 
    time = Math.floor(Math.round((spaminterval - (new Date().getTime() - Suser) / 1000) * 100) / 100) + 1
    hrs = Math.floor(time/3600)
    mins = Math.floor(time/60)
    secs = Math.floor(time%60)
    if(type===1){
        prefix = Prefix.prefix

        bot.SelfBotLock1 = async (message,mins,secs,limit = 30000) => {
            const filter = m => m.author.id === message.author.id;
            LockCode = Math.floor(Math.random()*8000) + 1000
            let LockMessage = `**You have been opening containers too fast!!**\n*You may use the command in another ${mins} minutes ${secs} seconds*\n***You can type \`${prefix}${LockCode}\` to reduce cooldown to 1 min***`
            message.channel.send(LockMessage).then(msg => {msg.delete(10000)})
            try {
            const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
            LockRandAns = collected.first().content
            if(LockRandAns.slice(prefix.length)===`${LockCode}`) Unlock = true
            else Unlock = false
            return Unlock;
            } catch (e) {
            return false;
            }
        }

        bot.SelfBotLock2 = async (message,mins,secs,limit = 30000) => {
            const filter = m => m.author.id === message.author.id;
            LockCode = Math.floor(Math.random()*10000)
            let LockMessage = `**You have been opening containers too fast!!**\n*You may use the command in another ${mins} minutes ${secs} seconds*`
            message.channel.send(LockMessage).then(msg => {msg.delete(10000)})
            return false
        }
    
        if(time>60) LockAns = await bot.SelfBotLock1(message,mins,secs)
        else LockAns = await bot.SelfBotLock2(message,mins,secs)
        if(LockAns === true){
            message.channel.send(`**Cooldown reduced**`).then(msg => {msg.delete(3000)})
            return false
        } 
        else return true
    } 
    if(type===3) message.channel.send(`**You have been opening containers too fast!!**\n*You may use the command in another ${mins} minutes ${secs} seconds*`)
    .then(msg => msg.delete(5000));
    if(type===2) message.channel.send(`**Gift Can be sent once every 2 mins and 30 secs** \n*You may use the command in another ${mins} minutes ${secs} seconds*`)
    .then(msg => msg.delete(5000));

}