const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


let notes = null;

const createNote = async (noteObject) => {
    //push to notes array in line 3
    await loadNotes();
    noteObject.id = uuidv4();
    notes.push(noteObject)
    //then call saveChanges()
    await saveChanges();
    return notes
}

const saveChanges = () => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(notes, null, 2), (err) => {
            if (err) reject(err)
            resolve()
        })
    })
}

const loadNotes = () => {
    return new Promise((resolve, reject) => {
        if (!!notes) {
            resolve(notes)
            return
        }
        fs.readFile(`${__dirname}/db/db.json`, 'utf-8', (err, data) => {
            if (err) reject(err)
            notes = JSON.parse(data)
            resolve(notes)
        })
    })
}

module.exports = { createNote }