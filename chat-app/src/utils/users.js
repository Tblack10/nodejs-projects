const users = []
const rooms = []

// Add User
const addUser = ({id, username, room}) => {
    //Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //Validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required'
        }
    }

    //Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    //Validate username
    if (existingUser) {
        return {
            error: 'Username is taken!'
        }
    }

    //Store User
    const user = { id, username, room }
    users.push(user)
    return { user }
}

// Remove User
const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id === id
    })

    if (index !== -1) {
        //Returns the first element of the returned array
        return users.splice(index, 1)[0]
    }
}

// Get User
const getUser = (id) => {
    const existingUser = users.find((user) => {
        return user.id === id
    })

    return existingUser
}

// Get Users in Room
const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}

// // Get Rooms
// const getRooms = () => {
//    users.forEach((user) => rooms.push(user.room))
//    console.log(rooms)
// }

// Add Room
const addRoom = (room) => {
    room = room.trim().toLowerCase()

    const existingRoom = rooms.find((room2) => {
        return room === room2
    })

    if (!existingRoom) {
        rooms.push(room)
    } else {
        console.log("Already Room")
    }

    console.log(rooms)
}

const removeRoom = (roomName) => {
    //rooms = rooms.filter(room => roomName !== room)
    const index = rooms.findIndex((room) => {
        return room === roomName
    })

    if (index !== -1) {
        //Returns the first element of the returned array
        return rooms.splice(index, 1)[0]
    }
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
    addRoom,
    removeRoom
}

