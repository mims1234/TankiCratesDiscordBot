//TankiCrates BOT

const http = require('http');
const express = require('express');
const app = express();
var server = require('http').createServer(app);
app.get("/", (request, response) => {
  //console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

//app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 150000);

const BotPrefix = require("./prefix.json");
const Discord = require("discord.js");
const db = require("quick.db");

var DBprofile = new db.table('DBprofile');
var DBstats = new db.table('DBstats');
var DBrole = new db.table('DBBotRole');
var DBachievements = new db.table('DBachievements');
var DBlevel = new db.table('DBlevel');
var DBidle = new db.table('DBidle');
var DBguildSetting = new db.table('DBguildSetting');
var DBgift = new db.table(`DBgift`);
var DBserver = new db.table(`DBserver`);

const fs = require("fs");
const ms = require("ms");

const bot =  new Discord.Client();

bot.Acommands = new Discord.Collection();
bot.AdminCommands = new Discord.Collection();
bot.help = new Discord.Collection();
bot.DMcommands = new Discord.Collection();

const DBL = require("dblapi.js");
const dbl = new DBL(process.env.API_TOKEN, bot);
const dbl1 = new DBL(process.env.API_TOKEN, { webhookServer: listener, webhookAuth: ''}, bot);

// dbl1.webhook.on('ready', hook => {
//   console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
// });
dbl1.webhook.on('vote', vote => {
  console.log(`User with ID ${vote.user} just voted!`);
});

//Server Counts API BotList
dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})


const FilesAcommands = fs.readdirSync('Acommands').filter(file => file.endsWith('.js'));
const FilesAdminCommands = fs.readdirSync('AdminCommands').filter(file => file.endsWith('.js'));
const FilesDMcommands = fs.readdirSync('DMcommands').filter(file => file.endsWith('.js'));

//Acommands Folder
for (const file of FilesAcommands) {
	  const commandsList3 = require('./Acommands/'+file);
    bot.Acommands.set(commandsList3.help.name, commandsList3);
    bot.help.set(commandsList3.help.name, commandsList3);
    bot.Acommands.set(commandsList3.help.aliases, commandsList3);
}
console.log(FilesAcommands.length+' files loaded in [ Acommands ] folder')

//AdminCommands Folder
for (const file of FilesAdminCommands) {
	  const commandsList1 = require('./AdminCommands/'+file);
    bot.AdminCommands.set(commandsList1.help.name, commandsList1);
    bot.help.set(commandsList1.help.name, commandsList1);
    bot.AdminCommands.set(commandsList1.help.aliases, commandsList1);
}
console.log(FilesAdminCommands.length+' files loaded in [ AdminCommands ] folder')

//DMcommands Folder
for (const file of FilesDMcommands) {
	  const commandsList2 = require('./DMcommands/'+file);
    bot.DMcommands.set(commandsList2.help.name, commandsList2);
    bot.help.set(commandsList2.help.name, commandsList2);
    bot.DMcommands.set(commandsList2.help.aliases, commandsList2);
}
console.log(FilesDMcommands.length+' files loaded in [ DMcommands ] folder')

//Bot Start
bot.on("ready" , async () => {
    console.log(`${bot.user.username} is online !`);
    if(!bot.on) return console.log("nodemon index.js")
    bot.user.setActivity("Container Openings", {type :"WATCHING"});
});

//Bot Message input initiation
bot.on("message", async message => {
    //console.log('Working')
    if(message.author.bot) return;
    if(message.channel.type === "dm")
    {
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1);

        let prefixMain = BotPrefix.prefix;
        let prefix = prefixMain
        if(message.content.startsWith(prefix) || message.content.startsWith(prefix.toUpperCase()))
        {
            // if(message.author.id != '292675388180791297')
            // {
            //   return message.channel.send('**Server Update!!** \n*Bot will be unavailable for few Hours*').then(msg => msg.delete(5000));
            //   console.log(`Request by ${message.author.username} from  DM`);
            // }
          
            IndexUserID = message.author.id
            const startUP = require("./Auto_commands/startUP.js");
            const startGift = require("./Auto_commands/startGift.js");
          
            user = await DBprofile.fetch(`TC_${IndexUserID}`)
            giftuser = await DBgift.fetch(`TC_${IndexUserID}`)
            if(!user)   
            {
                await startUP(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle)
                if(!giftuser) await startGift(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBgift)
                let commandsList2 = bot.DMcommands.get(cmd.slice(prefix.length));
                if(commandsList2) {commandsList2.run(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift,DBserver);  }
    
            }
            else{
                let commandsList2 = bot.DMcommands.get(cmd.slice(prefix.length));
                if(commandsList2) {commandsList2.run(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift,DBserver);  }
            }
        }
    }
    else
    {
        const startUP = require("./Auto_commands/startUP.js");
        const startGift = require("./Auto_commands/startGift.js");
        const levelUP = require("./Auto_commands/levelUP.js");
        const startServer = require("./Auto_commands/startServer.js");

        GuildID = message.guild.id

        let Customprefix = await DBguildSetting.fetch(`TC_${GuildID}`,{target:`.prefix`})
        if(Customprefix === null || Customprefix === undefined) Customprefix = BotPrefix.prefix

        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1);

        let prefixMain = BotPrefix.prefix;
        let prefix = (cmd.startsWith(Customprefix)) ? Customprefix : prefixMain

        function clean(text) {
            if (typeof(text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }

//           if (message.content.startsWith(prefix + "gotham")) {
//               message.delete();
//               if(message.author.id !== '292675388180791297') return;
//               try {
//               const code = args.join(" ");
//               let evaled = eval("(async () => {" + code + "})()");

//               if (typeof evaled !== "string")
//               evaled = require("util").inspect(evaled);

//               message.channel.send(clean(evaled), {code:"xl"});
//               } catch (err) {
//               message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
//               }
//           }
      
              if(cmd === 'tc-v2')
              {
                  message.channel.send('Am Online Bish!!!');
              }

              if(cmd === `${prefix}prefixS`)
              {
                  message.channel.send('Prefix Is wrking alrito');
              }

        //Prefix Checker for Folder commands
        if(message.content.startsWith(prefix) || message.content.startsWith(prefix.toUpperCase()))
        {
            // if(message.author.id != '292675388180791297')
            // {
            //   return message.channel.send('**Server Update!!** \n*Bot will be unavailable for few Hours*').then(msg => msg.delete(5000));
            //   console.log(`Request by ${message.author.username} from ${message.guild.name} server`);
            // }
          
            IndexUserID = message.author.id
            IndexGuildID = message.guild.id

            user = await DBprofile.fetch(`TC_${IndexUserID}`)
            serveruser = await DBserver.fetch(`TC_${IndexGuildID}_${IndexUserID}`)
            giftuser = await DBgift.fetch(`TC_${IndexUserID}`)
            if(!user)   
            {
                await startUP(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle)
                if(!giftuser) await startGift(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBgift)
                if(!serveruser) await startServer(bot,message,args,DBserver,serveruser)
                await CommandHandler()
            }
            else if(!giftuser) await startGift(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBgift)
            else
            {
                if(!serveruser) await startServer(bot,message,args,DBserver,serveruser)
                await levelUP(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle)
                await CommandHandler() 
            }
        
        }

        function CommandHandler(){

            let commandfile_3 = bot.Acommands.get(cmd.slice(prefix.length));
            if(commandfile_3) {   commandfile_3.run(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift,DBserver);  }

            if(message.author.id === '292675388180791297')
              {
                    let commandfile_1 = bot.AdminCommands.get(cmd.slice(prefix.length));
                    if(commandfile_1) {   commandfile_1.run(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift,DBserver);  }
              }

        }
    }


});
//Key To Run BOT
bot.login(process.env.TOKEN);
