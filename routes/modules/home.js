// 載入 Express 
const express = require('express')
// 載入 Express Router
const router = express.Router()

// home page route
router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router