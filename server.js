const express = require("express");

const PORT = process.env.PORT || 4040;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./public"));

app.get("/", (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.get("/notes", (req, res) => res.sendFile(`${__dirname}/public/notes.html`));

app.get("*", (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(PORT, () => {
  console.log(`App is currently running on port ${PORT}`);
});
