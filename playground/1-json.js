const fs = require('fs')

// const book = {
//     title: 'Ego is the enemy',
//     author:'Ryan Holiday'
// }

// Creates a book file
// const bookJSON = JSON.stringify(book)
// fs.writeFileSync('1-json.json', bookJSON)

// Loads/Reads a file
// const dataBuffer = fs.readFileSync('1-json.json')
// const dataJSON = dataBuffer.toString()
// const data = JSON.parse(dataJSON)
// console.log(data.title)

// const parsedData = JSON.parse(bookJSON)
// console.log(parsedData)

const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)

data.name = 'Travis'
data.age = '27'

const stringifyedData = JSON.stringify(data)
fs.writeFileSync('1-json.json', stringifyedData)

