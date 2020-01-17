const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");


module.exports = async (bot,message,args,DBprofile) => {

    LeaderboardGlobalUserID = message.author.id
    let prefix = Prefix.prefix;

    const CrystalsSet = new Set();
    const SuppliesSet = new Set();
    const ScoreSet = new Set();

    code = args[1]
    if(!code) return message.channel.send(`**Please Mention which Leaderboard to Display **\n\`Scores | Crystals | Supplies\`\n**Usage :** \`${prefix}top global <type-name>\`\n**Example :** \`${prefix}top global Scores\``);
    code = code.toLowerCase()

    let profile = await DBprofile.fetch(`TC_${LeaderboardGlobalUserID}`,{target : '.username'}) 
    if(!profile) return message.channel.send(`**Use \`${prefix}start\` to make a New Profile**`)
    switch (code) {
        case 'cry': 
        case 'c': 
        case 'crystals':     
                        score = [],temp = [],Name = [],z=0,sl=1;
                        rank = -1
                        A = await DBprofile.startsWith(`TC`,{target : `.data`}).then(resp => {
                            for(var i in resp)
                            {
                                if(resp[i].data.crystals >=-9999 ) 
                                {
                                    if(resp[i].ID === 'TC_undefined') 
                                    {
                                        message.channel.send('Updating Ranking .. Try the command Again').then(m=>m.delete(7000))
                                        DBprofile.delete('TC_undefined')
                                    }
                                    Name[z] = resp[i].data.id
                                    score[z] = resp[i].data.crystals
                                    temp[z] = resp[i].data.crystals
                                    z+=1;
                                }
                            }
                        })
                            //score.sort()
                            for (i=0; i < score.length; i++){
                                for (j=0, stop=score.length-i; j < stop; j++){
                                    if (score[j] > score[j+1]){
                                    swap(score, j, j+1);
                                    }
                                }
                            }
                        A = '🏆 | Global Crystals Leaderboard\n-----------------------------------------------\n'
                        for(i=(score.length-1);i>=0;i--)
                        {
                            for(var j in temp)
                            {
                                if(score[i] === temp[j])
                                {
                                    if(!CrystalsSet.has(Name[j]))
                                    {
                                        CrystalsSet.add(Name[j])
                                        if(sl<=10)
                                        {
                                            ValueFormater = numberFormatter("#,##0.##", temp[j]);
                                            MeMber = await bot.fetchUser(Name[j])
                                            Names = MeMber.username.replace(' ',"-")
                                            if(sl === 1) A = A + `🥇 <${Names}\n\t\t\t\t\t\t\tCrystals = ${ValueFormater}>\n`
                                            if(sl === 2) A = A + `🥈 <${Names}\n\t\t\t\t\t\t\tCrystals = ${ValueFormater}>\n`
                                            if(sl === 3) A = A + `🥉 <${Names}\n\t\t\t\t\t\t\tCrystals = ${ValueFormater}>\n`
                                            if(sl>3) A = A + `${sl}. <${Names}\n\t\t\t\t\t\t\tCrystals = ${ValueFormater}>\n`
                                        }
                                        sl+=1;
                                        if(Name[j] === message.author.id) save = j,rank = sl - 1
                                    }
                                }
                            }
                        }
                        CrystalsSet.clear();
                        B = '```md\n'+A+'<----------------------------------------------->\n'
                        if(rank > 0)
                        {
                            ValueFormater = numberFormatter("#,##0.##", temp[save]);
                            B= B +'<Your Rank <'+rank+'> \t\t\t<Crystals = '+ValueFormater+'>```'; 
                        }
                        else B = B + '```';
                        message.channel.send(B);
        break;
        case 'sup': 
        case 'supplies':     
                        score = [],temp = [],Name = [],z=0,sl=1;
                        rank = -1
                        A = await DBprofile.startsWith(`TC`,{target : `.data`}).then(resp => {
                            for(var i in resp)
                            {   
                                if(resp[i].data.supplies >=0)
                                {          
                                    if(resp[i].ID === 'TC_undefined') 
                                    {
                                        message.channel.send('Updating Ranking .. Try the command Again').then(m=>m.delete(7000))
                                        DBprofile.delete('TC_undefined')
                                    }                                  
                                Name[z] = resp[i].data.id
                                score[z] = resp[i].data.supplies
                                temp[z] = resp[i].data.supplies
                                z+=1
                                }
                            }
                            })
                            //score.sort()
                            for (i=0; i < score.length; i++){
                                for (j=0, stop=score.length-i; j < stop; j++){
                                    if (score[j] > score[j+1]){
                                    swap(score, j, j+1);
                                    }
                                }
                            }
                        A = '🏆 | Global Supplies Leaderboard\n-----------------------------------------------\n'
                        for(i=(score.length-1);i>=0;i--)
                        {
                            for(var j in temp)
                            {
                                if(score[i] === temp[j])
                                {
                                    if(!SuppliesSet.has(Name[j]))
                                    {
                                        SuppliesSet.add(Name[j])
                                        if(sl<=10)
                                        {   
                                            ValueFormater = numberFormatter("#,##0.##", temp[j]);
                                            MeMber = await bot.fetchUser(Name[j])
                                            Names = MeMber.username.replace(' ',"-")
                                            if(sl === 1) A = A + `🥇 <${Names}\n\t\t\t\t\t\t\tSupplies = ${ValueFormater}>\n`
                                            if(sl === 2) A = A + `🥈 <${Names}\n\t\t\t\t\t\t\tSupplies = ${ValueFormater}>\n`
                                            if(sl === 3) A = A + `🥉 <${Names}\n\t\t\t\t\t\t\tSupplies = ${ValueFormater}>\n`
                                            if(sl>3) A = A + `${sl}. <${Names}\n\t\t\t\t\t\t\tSupplies = ${ValueFormater}>\n`
                                        }
                                        sl+=1;
                                        if(Name[j] === message.author.id) save = j,rank = sl - 1
                                    }
                                }
                            }
                        }
                        SuppliesSet.clear();
                        ValueFormater = numberFormatter("#,##0.##", temp[save]);
                        B = '```md\n'+A+'<----------------------------------------------->\n'
                        if(rank > 0) B= B +'<Your Rank <'+rank+'> \t\t\t<Supplies = '+ValueFormater+'>```';
                        else B = B + '```';
                        message.channel.send(B);
        break;
        case 'sco': 
        case 'scores':     
                        score = [],temp = [],Name = [],z=0,sl=1;
                        rank = -1
                        await DBprofile.startsWith(`TC`,{target :`.data`}).then(resp => {
                            for(var i in resp)
                            {
                                if(resp[i].data.score >=0)
                                {
                                    if(resp[i].ID === 'TC_undefined') 
                                    {
                                        message.channel.send('Updating Ranking .. Try the command Again').then(m=>m.delete(7000))
                                        DBprofile.delete('TC_undefined')
                                    }      
                                    Name[z] = resp[i].data.id
                                    score[z] = resp[i].data.score
                                    temp[z] = resp[i].data.score
                                    z+=1;
                                }
                            }
                            })
                            for (i=0; i < score.length; i++){
                                for (j=0, stop=score.length-i; j < stop; j++){
                                    if (score[j] > score[j+1]){
                                    swap(score, j, j+1);
                                    }
                                }
                            }
                        A = '🏆 | Global Scores Leaderboard\n-----------------------------------------------\n'
                        for(i=(score.length-1);i>=0;i--)
                        {
                            for(var j in temp)
                            {
                                if(score[i] === temp[j])
                                {
                                    if(!ScoreSet.has(Name[j]))
                                    {
                                        ScoreSet.add(Name[j])
                                        if(sl<=10)
                                        {
                                            ValueFormater = numberFormatter("#,##0.##", temp[j]);                                            
                                            MeMber = await bot.fetchUser(Name[j])
                                            Names = MeMber.username.replace(' ',"-")
                                            if(sl === 1) A = A + `🥇 <${Names}\n\t\t\t\t\t\t\tScore = ${ValueFormater}>\n`
                                            if(sl === 2) A = A + `🥈 <${Names}\n\t\t\t\t\t\t\tScore = ${ValueFormater}>\n`
                                            if(sl === 3) A = A + `🥉 <${Names}\n\t\t\t\t\t\t\tScore = ${ValueFormater}>\n`
                                            if(sl>3) A = A + `${sl}. <${Names}\n\t\t\t\t\t\t\tScore = ${ValueFormater}>\n`
                                        }
                                        sl+=1;
                                        if(Name[j] === message.author.id) save = j,rank = sl - 1
                                    }
                                }
                            }
                        }
                        ScoreSet.clear();
                        B = '```md\n'+A+'<----------------------------------------------->\n'
                        if(rank > 0)
                        {
                            ValueFormater = numberFormatter("#,##0.##", temp[save]);
                            B= B +'<Your Rank <'+rank+'> \t\t\t<Score = '+ValueFormater+'>```'; 
                        }
                        else B = B + '```';
                        message.channel.send(B);
        break;
        default:        return message.channel.send(`**Please Mention which Leaderboard to Display **\n\`Scores | Crystals | Supplies\`\n**Usage :** \`${prefix}top global <type-name>\`\n**Example :** \`${prefix}top global Scores\``);
    }

    function swap(arr, first_Index, second_Index){
    var temp = arr[first_Index];
    arr[first_Index] = arr[second_Index];
    arr[second_Index] = temp;
    }

}
