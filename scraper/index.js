const { Client } = require("youtubei");

const youtube = new Client();

const fs = require('fs')

const run = async () => {
	const videos = await youtube.search("Bad apple!!", {
		type: "video", // video | playlist | channel | all
	});

    console.log(videos[0])

	const nextVideos = await videos.next(); // load next page

    let possibleentry = []
    videos.forEach(entry => {
        possibleentry.push({
            "name": entry.title,
            "creator": `https://youtube.com/channel/${entry.channel.id}`,
            "video": `https://youtube.com/watch?v=${entry.id}`
        })
    })

    console.log(possibleentry)

    fs.writeFileSync(`${__dirname}/topscrapedresults.json`, JSON.stringify(possibleentry, null, "\t"))
};

const scraped = require('./topscrapedresults.json')

function formatter() {
    try {
        let template = fs.readFileSync(`${__dirname}/./templates/audio.md`, 'utf8')

        scraped.forEach(entry => {
          let name = entry.name

          name = name.replace("|", "\\|")
          name = name.replace("||", "\\|\\|")
          name = name.replace("-", "\\-")
          name = name.replace("--", "\\-\\-")
          
          template += `\n| ${name} | [Click me!](${entry.creator}) | [Click me!](${entry.video}) |`
        });

        console.log(template)

        fs.writeFileSync(`${__dirname}/badapplescraped.md`, template)

      } catch (err) {
        console.error(err)
      }
}

try {
    run()

    formatter()
} catch (err) {
    console.error(err)
}
