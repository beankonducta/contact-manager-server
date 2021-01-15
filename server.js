const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(3000, () => {
})

const contacts = [];

app.get('/contacts', (req, res) => {
    res.send(contacts.sort((a, b) => (a.name > b.name) ? 1 : -1));
})

// just an idea for an end point, this could send only the differences between
// provided contact list and the servers contact list. 
app.get('/contacts/new', (req, res) => {
    res.send(contacts);
})

app.post('/contacts', (req, res) => {
    contacts.push(req.body);
    res.status(200).send(req.body);
})

app.put('/contacts/:id', (req, res) => {
    contacts[contacts.findIndex(val => val.id == req.params.id)] = req.body;
    res.status(200).send(req.body);
})

app.delete('/contacts/:id', (req, res) => {
    contacts.splice(contacts.findIndex(val => val.id == req.params.id), 1);
    res.status(200).send(req.params.id);
})