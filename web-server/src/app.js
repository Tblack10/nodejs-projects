const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
// Name of the view engine (hbs/express-handlebars/handlebars)
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
// Setup static direcotry to serve
// Used to serve up static files (Client Side)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => { 
    res.render('index', {
        title: 'Weather',
        name: 'Travis Black'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Travis Black'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'This is some helpful text.',
        title: 'Help',
        name: 'Travis Black'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
           error: "PLEASE PROVIDE AN ADDRESS"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, {temperature, chanceOfRain, summary, dailyHigh, dailyLow}) => {
            if (error) {
                res.send({ error })
            }
            res.send({
                temperature,
                chanceOfRain,
                summary,
                location,
                dailyHigh,
                dailyLow
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'YOU MUST PROVIDE A SEARCH TERM'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help is on the way!',
        title: 'LFHelp',
        name: 'TravisBlack'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'My goodness, you must be lost. 404',
        title: '404',
        name:'Travis Black'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})