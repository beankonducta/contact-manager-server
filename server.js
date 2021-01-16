const express = require('express')
const cors = require('cors')

const app = express()
const dotenv = require('dotenv').config();

const mongoose = require('mongoose')
const contactModel = require('./contactModel')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Successfully Connected!'));

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(3000, () => {
})

const contacts = [];

app.get('/contacts', (req, res) => {
    res.send(contacts.sort((a, b) => (a.name > b.name) ? 1 : -1));
})

app.get('/contacts/:sortType/:sortDir', (req, res) => {
    res.send(req.params.sortDir === 'desc' ? 
    contacts.sort((a, b) => (a[req.params.sortType] > b[req.params.sortType]) ? 1 : -1)
    : contacts.sort((a, b) => (a[req.params.sortType] < b[req.params.sortType]) ? 1 : -1));
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