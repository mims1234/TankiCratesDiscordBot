const Prefix = require("../prefix.json");
const Discord = require("discord.js");

const startGift = require("../Auto_commands/startGift.js");
const startProfile = require("../Auto_commands/startUP.js")

module.exports = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift) => {

    let prefix = Prefix.prefix;

    BlockGiftID = message.author.id
    BlockGiftName = message.author.username

    bot.BlockPageFunction = async (message, limit = 60000) => {
            data = await DBgift.fetch(`TC_${BlockGiftID}`,{target:`.Block`})
            NDdata = Object.keys(data) 
            Ndata=[]
            b=0
            for(a in NDdata)
            {
                    if(data[`${NDdata[a]}`]!=null){
                            Ndata[b] = NDdata[a];
                            b++;
                    } 
            }
            BlockList = ''
            z=1;
            for(a in Ndata){
                    user = await bot.fetchUser(Ndata[a],true)
                    BlockList = BlockList + `${z}. ${user.username}\n`
                    z++
            }

            question = `**Block List**\n\`\`\`md\n`+BlockList+`\n\`\`\``
            await message.channel.send(question)
    };

    if(args[1]) code = args[1].toLowerCase()
    
    if(code==="list")
    {
        data =  await DBgift.fetch(`TC_${BlockGiftID}`)
        if(!data)
        {
                await startProfile(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBgift,BlockGiftID,InboxGiftName)
                await startGift(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBgift,BlockGiftID,InboxGiftName)
                data =  await DBgift.fetch(`TC_${BlockGiftID}`)
                BlockCountData = data.Block
                BlockCountDataObject = Object.keys(BlockCountData)
                BlockCountDataLength=0
                for(a in BlockCountDataObject)
                {
                        if(BlockCountData[BlockCountDataObject[a]]!=null) BlockCountDataLength++
                }
                if(BlockCountDataLength===0) return message.channel.send(`**Your Block List is Empty!!**`)
        }
        else
        {
                BlockCountData = data.Block
                BlockCountDataObject = Object.keys(BlockCountData)
                BlockCountDataLength=0
                for(a in BlockCountDataObject)
                {
                        if(BlockCountData[BlockCountDataObject[a]]!=null) BlockCountDataLength++
                }
                if(BlockCountDataLength===0) return message.channel.send(`**Your Block List is Empty!!**`)
        }

        console.log(`Request for ${BlockGiftName} Block List`)
        await bot.BlockPageFunction(message)  
    }
    else
    {
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
        playeradd = message.guild.member(message.mentions.users.last()) || message.guild.members.get(args[1]);
        if(!playeradd) return message.channel.send(`**To add a blocked player type:** \`${prefix}block add @mention\` or the \`@mention doesnt exist\``)
        BlockAddID = playeradd.id
        if(BlockAddID === BlockGiftID) return message.channel.send(`**You cannont add yourself to Block List**`)
        BlockPlayer = await DBgift.fetch(`TC_${BlockGiftID}`,{target:`.Block.${BlockAddID}`})
        if(BlockPlayer) return message.channel.send(`**User is already in your Block List**`)
        await DBgift.set(`TC_${BlockGiftID}`,true,{target:`.Block.${BlockAddID}`})
        user = await bot.fetchUser(BlockAddID,true)
        message.channel.send(`*Added* ***${user.username}*** *to Block List* `)   
        console.log(`${BlockGiftName} Blocked ${user.username}`) 
    }
}
