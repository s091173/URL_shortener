const mongoose = require('mongoose')
// 載入 URL Model 
const Url = require('../url')

mongoose.connect('mongodb://localhost/url-shortener', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')

  Url.create({
    name: 'www.google.com',
    code: '8Yajq'
  })
  console.log('done')
})