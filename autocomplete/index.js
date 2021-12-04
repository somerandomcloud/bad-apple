const { Client } = require("youtubei");
const fs = require('fs');

const youtube = new Client();

if (process.argv.length !== 3) {
    console.log('Usage : node . <video id>')
    process.exit(1)
}

const run = async () => {
    const videoid = process.argv[2]

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

run()