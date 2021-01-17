const express = require('express')
const mongoose = require('mongoose')

const app = express()

const PORT = 3000

mongoose.connect('mongodb://localhost/url-shortener', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(PORT, () => {
  console.log(`The app is running on http://localhost:${PORT}`)
})

