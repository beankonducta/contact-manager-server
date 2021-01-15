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