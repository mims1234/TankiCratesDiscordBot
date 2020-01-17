const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");

module.exports = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift) => {

    let prefix = Prefix.prefix;

    BlockGiftID = message.author.id
    BlockGiftName = message.author.username

    let Suser = message.author
    let spaminterval =3
    if (Suser.InboxGiftSpam) {
            if (new Date().getTime() - Suser.InboxGiftSpam < spaminterval*1000) {
            spams(message,Suser.InboxGiftSpam,spaminterval)
            return;
            }
            else { Suser.InboxGiftSpam = new Date().getTime()}
    }
    else { Suser.InboxGiftSpam = new Date().getTime()}

    data = await DBgift.fetch(`TC_${BlockGiftID}`,{target:`.Block`})
    BlockDataArray = Object.keys(data) 
    BlockDeleteArray=[]
    b=0;
    for(a in BlockDataArray)
    {
            if(data[`${BlockDataArray[a]}`]!=null){
                    BlockDeleteArray[b] = BlockDataArray[a]
                    b++ 
            } 
    }
    playerdelete = message.guild.member(message.mentions.users.last()) || message.guild.members.get(args[1]);
    if(!playerdelete) return message.channel.send(`**To delete a blocked player type:** \`${prefix}block rem @mention\` or the \`@mention doesnt exist\``)
    BlockDeleteID = playerdelete.id
    BlockPlayer = await DBgift.fetch(`TC_${BlockGiftID}`,{target:`.Block.${BlockDeleteID}`})
    if(!BlockPlayer) return message.channel.send(`**User Is Not in your Block List**`)
    await DBgift.set(`TC_${BlockGiftID}`,null,{target:`.Block.${BlockDeleteID}`})
    user = await bot.fetchUser(BlockDeleteID,true)
    message.channel.send(`*Removed* ***${user.username}*** *from Block List* `)
    console.log(`${BlockGiftName} Unblocked ${user.username}`) 
}
