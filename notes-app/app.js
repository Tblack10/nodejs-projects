const notes = require('./notes.js')
const yargs = require('yargs')
const chalk = require('chalk')

// Add, remove, read, list

// Create add command
yargs.command({
    command: 'add',
    description: 'Add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    description: 'Remove a note',
    builder: {      
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        console.log('Removing: ' + argv.title)
        notes.removeNote(argv.title)
    }
})

// Create read command
yargs.command({
    command: 'read',
    description: 'Read a note',
    builder: {
        title: {
            describe: 'Note Title to Read',
            demandOption: true,
            type: String
        }
    },
    handler (argv) {
        console.log('Reading: ' + argv.title)
        notes.readNote(argv.title)
    }
})

// Create list command
yargs.command({
    command: 'list',
    description: 'List the notes!',
    handler () {
        notes.listNotes()
    }
})

yargs.parse()
//console.log(yargs.argv)