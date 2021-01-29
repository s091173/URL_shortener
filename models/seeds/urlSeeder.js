// 載入 URL Model 
const Url = require('../url')
// 引用 mongoose
const db = require('../../config/mongoose')

db.once('open', () => {
  Url.create({
    name: 'http://www.google.com',
    code: '8Yajq'
  })

  console.log('done')
})