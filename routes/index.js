// 載入 Express
const express = require('express')
// 載入 Express Router
const router = express.Router()

// 引入 home 模組程式碼
const home = require('./modules/home')
// 網址結構符合 / 字串的 request 導向 home 模組
router.use('/', home)

// 引入 shortUrl 模組程式碼
const shortUrl = require('./modules/shortUrl')
// 將網址結構符合 /shorten 字串開頭的 request 導向 shortUrl 模組 
router.use('/shorten', shortUrl)


module.exports = router