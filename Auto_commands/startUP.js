
module.exports= async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBgift,NewProfileID,NewProfileName) => {

    if(NewProfileID){
        StartUPuserName = NewProfileName
        StartUPid = NewProfileID
    }
    else
    {
        StartUPuserName = message.author.username
        StartUPid = message.author.id
    }

    //if(!user)
    { 
        let NewProfile = {
        username: `${StartUPuserName}`,
        id: `${StartUPid}`,
        tankicoins:5,
        containers:50,
        crystals: 30000,
        prestige: 0,
        supplies:0,
        skins:0,
        paints:0,
        score:0,
        totalXT:0,
        totalLC:0,
        totalDC:0,
        totalPR:0,
        totalUC:0,
        totalU:0,
        totalR:0,
        totalE:0,
        totalL:0,
        totalA:0,
        totalP:0,
        totalAchievements:0,
        Paints:{},
        Skins:{}
        }

        let NewRole = {
            username: `${StartUPuserName}`,
            id: `${StartUPid}`,
            Tier1:null,
            Tier2:null,
            Tier3:null,
        }

        let NewLevel = {
            username: `${StartUPuserName}`,
            id: `${StartUPid}`,
            level : 1
        }

        let NewIdle = {
            username: `${StartUPuserName}`,
            id: `${StartUPid}`,
            Daily : true,
            Weekly : true,
            DailyStreak: 0,
            WeeklyStreak: 0,
            Prestige: false
        }

    DBprofile.set(`TC_${StartUPid}`,NewProfile);
    //DBstats.set(`TC_${StartUPid}`,NewProfile);
    //DBachievements.set(`TC_${StartUPid}`,NewProfile);
    DBlevel.set(`TC_${StartUPid}`,NewLevel);
    DBidle.set(`TC_${StartUPid}`,NewIdle);
    DBrole.set(`TC_${StartUPid}`,NewRole);

    console.log(`${StartUPuserName} Profile Created`)
    }
}
