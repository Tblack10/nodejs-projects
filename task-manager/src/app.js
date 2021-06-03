const express = require('express')
// Starts the database by requiring the file to run
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

//BodyParser (JSON Conversion)
app.use(express.json())

//My Custom Routes
app.use(userRouter)
app.use(taskRouter)

module.exports = app

