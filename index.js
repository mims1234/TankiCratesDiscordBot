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

const fs = require("fs");
const ms = require("ms");

const bot =  new Discord.Client();

bot.Acommands = new Discord.Collection();
bot.AdminCommands = new Discord.Collection();
bot.help = new Discord.Collection();

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
    if(message.channel.type === "dm") return;

    //if(message.author.id != '292675388180791297') return 
    const startUP = require("./Auto_commands/startUP.js");
    const levelUP = require("./Auto_commands/levelUP.js");

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

      if (message.content.startsWith(prefix + "gotham")) {
          message.delete();
          if(message.author.id !== '292675388180791297') return;
          try {
          const code = args.join(" ");
          let evaled = await eval(code);

          if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);

          message.channel.send(clean(evaled), {code:"xl"});
          } catch (err) {
          message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
          }
      }

//Prefix Checker for Folder commands

    
    if(message.content.startsWith(prefix) || message.content.startsWith(prefix.toUpperCase()))
    {
        // if(message.author.id != '292675388180791297')
        // {
        //   return message.channel.send('**Server will be down for few Hours!!** \n*Sorry for the Inconvenience*').then(msg => msg.delete(5000));
        //   console.log(`Request by ${message.author.username} from ${message.guild.name} server`);
        // }
        StartUserID = message.author.id
        user = await DBprofile.fetch(`TC_${StartUserID}`)
        if(!user)   
        {
            await startUP(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle)
            await CommandHandler()
        }
        else
        {
            await CommandHandler()
            await levelUP(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle)
        }
    }

    function CommandHandler(){

        let commandfile_3 = bot.Acommands.get(cmd.slice(prefix.length));
        if(commandfile_3) {   commandfile_3.run(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting);  }
      
        if(message.author.id === '292675388180791297')
          {
                let commandfile_1 = bot.AdminCommands.get(cmd.slice(prefix.length));
                if(commandfile_1) {   commandfile_1.run(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting);  }
          }

        if(cmd === `${prefix}help` || cmd === `${prefix}h`)
        {
            let HelpID = message.author.id;
            let HelpName = message.member.displayName
            let Uicon = message.member.user.avatarURL;
        
            let Suser = message.author
            let spaminterval = 3
                if (Suser.HelpSpam) {
                    if (new Date().getTime() - Suser.HelpSpam < spaminterval*1000) {
                        spams(message,Suser.HelpSpam,spaminterval)
                        return;
                    }
                    else { Suser.HelpSpam = new Date().getTime()}
                }
                else { Suser.Help = new Date().getTime()}

            text = `:clipboard: BOT COMMANDS :clipboard:\n\`\`\`md\n#Game-Commands\n\n`
            z=0
            bot.help.map(a => {
                if(a.help.name === undefined || a.help.desc === undefined) Suser
                else {z++;text = text + `${z}  <${prefix}${a.help.name}  -  ${a.help.desc}>\n`}
            })
            text = text + `\`\`\`\`⫸ Requested by ${HelpName} ⫷\``
            message.channel.send(text)
        }
    }

    if(cmd === 'tc-v2')
    {
        message.channel.send('Am Online Bish!!!');
    }
  
    if(cmd === `${prefix}prefixS`)
    {
        message.channel.send('Prefix Is wrking alrito');
    }

});
//Key To Run BOT
bot.login(process.env.TOKEN);
