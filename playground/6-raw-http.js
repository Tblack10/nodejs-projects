const https = require('https')

const url = 'https://api.darksky.net/forecast/e0c9757eedc823e87b900c0c7060ebff/40,-75?units=ca&lang=fr'

const request = https.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
        console.log(chunk)
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })

})

request.on('error', (error) => {
    console.log('An error', error)
})

request.end()
