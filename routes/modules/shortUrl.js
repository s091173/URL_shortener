// 載入 Express 
const express = require('express')
// 載入 Express Router
const router = express.Router()

// 載入 Url Model
const Url = require('../../models/url')
// 載入 generateCode 亂碼產生器
const generateCode = require('../../public/javascript/generateCode')



// submit request
router.post('/', (req, res) => {
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

// shortUrl request
router.get('/:code', (req, res) => {
  const code = req.params.code
  Url.findOne({ code: code })
    .lean()
    .then(url => {
      res.redirect(url.name)
    })
    .catch(error => console.log(error))
})

module.exports = router