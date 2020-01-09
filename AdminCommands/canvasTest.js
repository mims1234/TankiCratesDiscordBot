const { Canvas }  = require("canvas-constructor"); 
const fetch = require("node-fetch"); 

const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");

const imageUrlRegex = /\?size=2048$/g;


module.exports.run = async (bot,message,args) => {

    if(message.author.id != '292675388180791297') return

    NOWTIME = Date.now()

    URL1 = `https://en.tankiwiki.com/images/en/3/3b/Coloring_phoenix.png`
    URL2 = `https://en.tankiwiki.com/images/en/2/2d/SkyPaint.png`
    URL3 = `https://en.tankiwiki.com/images/en/a/af/Coloring_blaze.jpg`

    //score = 420

    profile = async(URL1,URL2,URL3) => {

       try {

            const img1 = await fetch(URL1.replace(imageUrlRegex, "?size=32"))
            const avatar1 = await img1.buffer();
            const img2 = await fetch(URL2.replace(imageUrlRegex, "?size=32"))
            const avatar2 = await img2.buffer();
            const img3 = await fetch(URL3.replace(imageUrlRegex, "?size=32"))
            const avatar3 = await img3.buffer();
          
            return new Canvas(180, 360)

            //.setColor('#FF0000')
            //.addRect(0,0,180,360)

            //.setColor("rgba(255, 255, 0, 1)")
            //.addRect(0,0,180,120)
            //.setShadowColor("rgba(50, 0, 252, 1)")

            //.setColor('#00fc1d')
            //.addRect(0,120,4,120)

            //.setColor('#3200fc')
            //.addRect(0,240,4,120)


            .addImage(avatar3,10,10)
            .addImage(avatar1,10,130)
            .addImage(avatar2,10,250)

            .save()
            .createBeveledClip(0, 0, 180, 120, 30)
            .restore()

            .toBuffer();

          } catch (error) {
            await message.channel.send(`Something happened: ${error.message}`);
          }
      }

      buf = await profile(URL1,URL2,URL3)
      pic = new Discord.Attachment(buf)
      SendMessage = async(pic) => {
        ENDTIME = Date.now()
        DURATION = ENDTIME - NOWTIME
        DurationToOpen = `${DURATION/1000} ms`
        await message.channel.send(pic)
        console.log(DurationToOpen)
      }

      SendMessage(pic)


    //https://en.tankiwiki.com/images/en/3/3b/Coloring_phoenix.png
    //https://en.tankiwiki.com/images/en/2/2d/SkyPaint.png
    //https://en.tankiwiki.com/images/en/a/af/Coloring_blaze.jpg

}
module.exports.help = {
    name : "cv"
}