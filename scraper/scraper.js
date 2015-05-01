var fs = require('fs')
var cheerio = require('cheerio')
var request = require('request')

var url = 'http://www.fourwheeler.com/how-to/wheels-tires/154-1203-the-hot-sheet-33-off-road-tires-tested/'

request(url, function(error, response, html) {
  if (!error) {
    var $ = cheerio.load(html)

    var json = {
      tires: []
    }

    var count = 0
    $('.article-image-single').each(function(index, element) {
      if (index % 2 !== 0) {
        var tire = json.tires[count] = {}

        var imageElement = $(element).children('.gallery-link').children('img')
        var descriptionElement = $(element).next()
        var ratingElement = $(element).next().next().next()


        tire.imageUrl = imageElement.attr('src')

        tire.title = descriptionElement.find('strong').text()
        //  Hacky way to get the description string. For some reason I couldn't go past the br with next()
        tire.description = descriptionElement.find('br')[0].next.data.replace(/(\r\n|\n|\r)/gm, '')

        tire.ratings = {}
        ratingElement.find('strong').each(function(i, category) {
          var cat = $(category).text().replace(/(:)/gm, '').toLowerCase()
          var val = $(category)[0].next.data.match(/(\*)/g).length

          tire.ratings[cat] = val
        })

        count++
      }
    })

    fs.writeFile(__dirname + '/output.json', JSON.stringify(json, null, 2), function(err) {
      if (!err)
        console.log('File succesfully written!')
      else
        console.log('There was an error writing the file')
    })
  } else {
    console.log('There was an error requesting the page source.')
  }
})
