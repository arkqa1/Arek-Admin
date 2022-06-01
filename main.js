const express = require('express')
const mysql = require('mysql')
const dotenv = require('dotenv')
const path = require('path')

// load .env
dotenv.config()

// express setup
const app = express()
const port = 3000
app.use(express.static('public'))

// ejs setup
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

/// mysql connection pool
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'komis'
})
// router 

app.get('/', (req, res) => {
  res.render('index', { title: 'Strona Glowna' })
})

app.get('/lista', (req, res) => {
  pool.query(`SELECT * FROM ${req.query.table};`, (err, result, fields) => {
    res.render('lista', { title: "Lista", data: result || err })
  })
})


app.listen(port, () => {
  console.log(`Aplikacja dziala na porcie: ${port}`)
})
