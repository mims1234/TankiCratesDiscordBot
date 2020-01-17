const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");


module.exports = async (bot,message,args,DBprofile,DBserver) => {

    LeaderboardServerUserID = message.author.id
    LeaderboardServerID = message.guild.id
    let prefix = Prefix.prefix;

    const ScoreSet = new Set();

    code = 'scores'

    let profile = await DBprofile.fetch(`TC_${LeaderboardServerUserID}`,{target : '.username'}) 
    if(!profile) return message.channel.send(`**Use \`${prefix}start\` to make a New Profile**`)
    switch (code) {
        case 'scores':     
                        score = [],temp = [],Name = [],z=0,sl=1;
                        rank = -1
                        await DBserver.startsWith(`TC_${LeaderboardServerID}`,{target :`.data`}).then(resp => {
                            for(var i in resp)
                            {
                                if(resp[i].data.score >=0)
                                {
                                    if(resp[i].ID === 'TC_undefined') 
                                    {
                                        message.channel.send('Updating Ranking .. Try the command Again').then(m=>m.delete(7000))
                                        DBserver.delete('TC_undefined')
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
                        A = '🏆 | Server Scores Leaderboard\n-----------------------------------------------\n'
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
                            B= B +'<Your Rank <'+rank+'> \t\t\t<Score = '+ValueFormater+'>```\`⫸ Scores collected since 10th Jan 2020 ⫷\`'; 
                        }
                        else B = B + '```\n\`⫸ Command Added 10th Jan 2020 ⫷\`';
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
