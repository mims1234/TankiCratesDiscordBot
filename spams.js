const fs = require("fs");
module.exports = function(message,Suser,spaminterval) { 

    let textfile = JSON.parse(fs.readFileSync("TextFolder/TextFile.json","utf8"));

    var CDkey = Object.keys(textfile.Cooldown)
    CODE = Math.floor(Math.random() * CDkey.length)
    cooldown = textfile['Cooldown']
    time = Math.floor(Math.round((spaminterval - (new Date().getTime() - Suser) / 1000) * 100) / 100) + 1
    message.channel.send(`**${cooldown[CDkey[CODE]]}** \n*You may use the command in another ${time} seconds*`)
    .then(msg => msg.delete(5000));

}