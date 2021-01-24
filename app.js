const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

// 載入 Url Model
const Url = require('./models/url')
// 載入 generateCode 亂碼產生器
const generateCode = require('./public/javascript/generateCode')

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

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// home page route
app.get('/', (req, res) => {
  res.render('index')
})


// after submit
app.post('/', (req, res) => {
  // 宣告短網址變數
  let shortUrl = ''

  // 取得輸入的網址
  const url = req.body.url
  // 尋找資料庫相對應網址
  Url.find({ name: url })
    .lean()
    .then(link => {
      // 如果網址存在
      if (link.length !== 0) {
        // 取得短網址
        shortUrl = link[0].code
        // 如果沒有相對應的網址
      } else {

        // 產生一組英數亂碼
        shortUrl = generateCode()
        // 從資料庫尋找產生的短網址
        Url.find({ code: shortUrl })
          .lean()
          .then(link => {
            // 如果短網址有重複
            while (link.length !== 0) {
              // 產生新的短網址
              shortUrl = generateCode()
            }
            Url.create({
              name: url,
              code: shortUrl
            })
          })
      }
    })
    .then(() => {
      res.render('index', { shortUrl, url })
    })
    .catch(error => console.log(error))
})


app.listen(PORT, () => {
  console.log(`The app is running on http://localhost:${PORT}`)
})