const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(3000, () => {
})

app.get('/contacts', (req, res) => {
})

app.post('/contacts', (req, res) => {
})

app.put('/contacts/:id', (req, res) => {
})

app.delete('/contacts/:id', (req, res) => {
})