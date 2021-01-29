const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

// 引用路由器
const routes = require('./routes')
// 引用 mongoose 
require('./config/mongoose')

const app = express()

const PORT = process.env.PORT || 3000

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }),
  routes)


app.listen(PORT, () => {
  console.log(`The app is running on http://localhost:${PORT}`)
})