const request = require('request')

const weatherCode = (lat, long, callback) => {
    //const weatherUrl = 'https://api.darksky.net/forecast/e0c9757eedc823e87b900c0c7060ebff/49.2827,-123.1207?units=ca&lang=fr'
    const url = 'https://api.darksky.net/forecast/e0c9757eedc823e87b900c0c7060ebff/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '?units=ca&lang=fr'
    //json automatically parses the json into an obj
    request({url, json: true}, (error, {body}) => {
        // const data = JSON.parse(response.body)
        // console.log(data.currently)
        if (error) {
            callback('Weather services are currently unavailable')
        } else if (body.error) {
            callback("Unable to find location")
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                chanceOfRain: body.currently.precipProbability,
                summary: body.daily.data[0].summary,
                dailyHigh: body.daily.data[0].temperatureHigh,
                dailyLow: body.daily.data[0].temperatureLow
                
            })
        }
    })
}

module.exports = weatherCode