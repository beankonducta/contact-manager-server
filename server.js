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

app.get('/contacts', async (req, res) => {
    try {
        const contacts = await contactModel.find().sort({name: "desc"});
        res.status(200).send(contacts);
    } catch {
        res.status(500).send("Error fetching contacts!");
    }
})

app.get('/contacts/:sortType/:sortDir', async (req, res) => {
    try {
        const contacts = await contactModel.find().sort({[req.params.sortType]: req.params.sortDir});
        res.status(200).send(contacts);
    } catch {
        res.status(500).send("Error fetching contacts!");
    }
})

app.post('/contacts', async (req, res) => {
    try {
        const contact = await new contactModel({ ...req.body }).save();
        res.status(200).send(contact);
    } catch {
        res.status(500).send("Error creating contact.");
    }
})

app.put('/contacts/:id', async (req, res) => {
    try {
        const contact = await contactModel.findOneAndUpdate({ _id: req.params.id }, req.body, {useFindAndModify : false});
        res.status(200).send(contact);
    } catch {
        res.status(404).send("Contact doesn't exist!");
    }
})

app.delete('/contacts/:id', async (req, res) => {
    try {
        const contact = await contactModel.deleteOne({ _id: req.params.id });
        res.status(200).send(contact);
    } catch {
        res.status(404).send("Contact doesn't exist!");
    }
})