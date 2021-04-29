const express = require("express");
const fs = require("fs");
const db = require('./db')
const PORT = process.env.PORT || 4040;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./public"));

app.get("/", (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.get("/notes", (req, res) => res.sendFile(`${__dirname}/public/notes.html`));

app.get("/api/notes", (req, res) => {
  //TODO: read from db.json and return all notes as JSON
  fs.readFile(`${__dirname}/db/db.json`, 'utf8', (err, data) => {
      if (err) throw err
      res.json(data)
  })
});

app.get("*", (req, res) => res.sendFile(`${__dirname}/public/index.html`));

// const pushNewNote = (note) => {
//   //returns the array to be written to db.json
//   fs.readFile(`${__dirname}/db/db.json`, 'utf8', (err, data) => {
//     if (err) throw err
//     const previousData = JSON.parse(data);
//     const dbData = [previousData]
//     dbData.push(note)
//     //console.log(dbData)
//     return dbData
//   })
  
// }

app.post("/api/notes", async (req, res) => {
    //TODO: use uuidv4 to generate unique id and push note object to db.json
    const newNote = req.body;
    const newDB = await db.createNote(newNote);
    res.json(newDB)
    
    
});

app.listen(PORT, () => {
  console.log(`App is currently running on port ${PORT}`);
});
