const app = require('./app')
const port = process.env.PORT

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})











// const main = async() => {
//     // const task = await Task.findById('5e1644d1f2520b387d8f1797')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('5e1644bcf2520b387d8f1795')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()



// const pet = {
//     'name': 'Hal'
// }

// pet.toJSON = function() {
//     return {}
// }
// console.log(JSON.stringify(pet))

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Under Maintenace')
// })

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', {expiresIn: '7 days'})

//     const data = jwt.verify(token, 'thisismynewcourse')

//     console.log(data)
// }

// myFunction()