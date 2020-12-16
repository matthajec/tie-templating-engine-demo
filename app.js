const express = require('express')
const app = express()

const tie = require('./tie')

app.engine('tie', tie)

app.set('views', './views')
app.set('view engine', 'tie')

app.get('/', function (req, res) {
  res.render('index', { num1: Math.floor(Math.random() * 6) + 1, num2: Math.floor(Math.random() * 6) + 1 })
})

app.listen(3000)