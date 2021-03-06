const audioedits = require('../badappleaudio.json')
const videoedits = require('../badapplevideo.json')
const related = require('../badapplerelated.json')

const audiotemplate = `${__dirname}/./templates/audio.md`
const videotemplate = `${__dirname}/./templates/video.md`
const relatedtemplate = `${__dirname}/./templates/related.md`

const fs = require('fs')

function audioFormatter() {
    try {
        let template = fs.readFileSync(audiotemplate, 'utf8')

        audioedits['audio-edits'].forEach(entry => {
          let name = entry.name

          name = name.replace("|", "\\|")
          name = name.replace("||", "\\|\\|")
          
          template += `\n| ${name} | [Click me!](${entry.creator}) | [Click me!](${entry.video}) |`
        });

        console.log(template)

        fs.writeFileSync(`${__dirname}/../badappleaudio.md`, template)

      } catch (err) {
        console.error(err)
      }
}

function videoFormatter() {
    try {
        let template = fs.readFileSync(videotemplate, 'utf8')

      videoedits['video-edits'].forEach(entry => {
          let coderepo = entry['source-code']

          if(!coderepo || coderepo === null) coderepo = "The sourcecode to the project is not available!"

          template += `\n| ${entry.name.replace("|", "│")} | [Click me!](${entry.creator}) | ${coderepo} | [Click me!](${entry.video}) |`
      });

        console.log(template)

        fs.writeFileSync(`${__dirname}/../badapplevideo.md`, template)

      } catch (err) {
        console.error(err)
      }
}

function relatedFormatter() {
    try {
        let template = fs.readFileSync(relatedtemplate, 'utf8')

        related['related'].forEach(entry => {
          template += `\n| ${entry.name.replace("|", "│")} | [Click me!](${entry.creator})| [Click me!](${entry.video}) |`
        });

        console.log(template)

        fs.writeFileSync(`${__dirname}/../badapplerelated.md`, template)

      } catch (err) {
        console.error(err)
      }
}

audioFormatter()
videoFormatter()
relatedFormatter()

module.exports = {
  audioFormatter,
  videoFormatter,
  relatedFormatter
}