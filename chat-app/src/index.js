const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom, getRooms, addRoom, removeRoom } = require('./utils/users')

const app = express()
//Express does this automatically, however, IO requires a 'Server' type
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    //Listens for a user joining a room
    socket.on('join', ({username, room}, callback) => {

        const { error, user } = addUser({id: socket.id, username, room})        

        if (error) {
            return callback(error)
        }

        socket.join(user.room)
        addRoom(user.room)
        socket.emit('sendMessage', generateMessage('Admin', 'Welcome!'))
        socket.broadcast.to(user.room).emit('sendMessage', generateMessage('Admin', `${user.username} has joined`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback()
    })

    //Listening for 'sendMessage'
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        const filter = new Filter()

        if (filter.isProfane(message)) {
            //return callback("Profanity is not allowed")
            return callback(filter.clean(message))
        }
        //Emits to EVERY open connection (io)
        //io.emit('sendMessage', generateMessage(message))

        io.to(user.room).emit('sendMessage', generateMessage(user.username, message))
        //Sends acknowledgment of event occuring
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
      const user = getUser(socket.id)
      io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?=${coords.lat},${coords.long}`))
      callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            const userCount = getUsersInRoom(user.room)

            io.to(user.room).emit('sendMessage', generateMessage('Admin', `${user.username} has left!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: userCount
            })
            console.log(userCount.length)

            if (userCount.length == 0){
                removeRoom(user.room)
            }
        }


    })
})


//App changed to server
server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})

