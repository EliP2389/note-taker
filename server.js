// const fs = require('fs');
// const path = require('path');
const express = require('express');
const { notes } = require('./data/notes')

const PORT = process.env.PORT || 3001;
const app = express();

// app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.title) {
        filteredResults = filteredResults.filter(notes => notes.title === query.title);
    }
    if (query.text) {
        filteredResults = filteredResults.filter(notes => notes.text === query.text);
    }
    return filteredResults;
}

function findById(id, notesArray) {
    const result = notesArray.filter(notes => notes.id === id)[0];
    return result;
  }
  

app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (results) {
      res.json(result);
    } else {
        res.send(404);
    }
  });

  app.post('/api/notes', (req, res) => {
      console.log(req.body);
      res.json(req.body);
  });
  





// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// });

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/notes.html'));
// });

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// });




app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });