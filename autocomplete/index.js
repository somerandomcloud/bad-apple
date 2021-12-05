const { Client } = require("youtubei");
const fs = require('fs');

const youtube = new Client();

const autocomplete = async (videoied) => {
    const videoid = videoied

    if(!videoid) return console.log('No video id supplied')

    const video = await youtube.getVideo(videoid);
    
    let originaljson = fs.readFileSync(`${__dirname}/../badappleaudio.json`, 'utf8')

    let parsedjson = JSON.parse(originaljson)

    console.log(parsedjson['audio-edits'])

    console.clear()

    let hits = 0

    parsedjson['audio-edits'].forEach(val => {

        if(val.video === `https://youtube.com/watch?v=${video.id}`) hits += 1

    })

    if(hits !== 0) return console.log('File already contains video')
    else {
        console.log('Video being added...')

        parsedjson['audio-edits'].push({name: video.title, creator: `https://youtube.com/channel/${video.channel.id}`, video: `https://youtube.com/watch?v=${video.id}`})
    }

    console.log(parsedjson['audio-edits'])

    fs.writeFileSync(`${__dirname}/../badappleaudio.json`, JSON.stringify(parsedjson, null, "\t"))
}

module.exports = {
    autocomplete,
}