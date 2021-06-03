const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title )
    debugger
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green("New Note Added"))
    } else {
        console.log(chalk.red("Note Title Taken"))
    }
}

const removeNote =  (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if (notesToKeep.length < notes.length) {
        console.log(chalk.green("Note Removed!!!"))
    } else {
        console.log(chalk.red("Note NOT Removed!!!"))
    }
    saveNotes(notesToKeep)
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.green("Your Notes: "))
    notes.forEach(note => {
        console.log(chalk.yellow(note.title))
    });
}

const readNote = (title) => {
    notes = loadNotes()
    const noteToBeRead = notes.find((note) => note.title === title)
    if (noteToBeRead) {
        console.log(noteToBeRead)
        console.log(chalk.green(noteToBeRead.title))
        console.log(chalk.yellow(noteToBeRead.body))
    } else {
        console.log(chalk.red("No note with that title was found"))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        const data = JSON.parse(dataJSON)
        return data
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}