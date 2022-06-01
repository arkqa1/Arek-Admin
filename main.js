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

app.get('/table', (req, res) => {
  pool.query(`SELECT * FROM ${req.query.t};`, (err, result, fields) => {
    res.render('table', { title: "Lista", data: result || err })
  })
})

app.get("/databases", (req, res) => { 
  pool.query(`SHOW DATABASES;`, (err, result, fields) => {
    res.render('databases', { title: "Baza Danych", databases: result || err })
  })
})

app.get("/tables", (req, res) => {
  pool.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='${req.query.d}';`, (err, result, fields) => {
    res.render('tables', { title: "Tabele", tables: result || err })
  })
})

app.get("/insert", (req, res) => {
  pool.query(`SELECT column_name FROM information_schema.columns WHERE table_name='${req.query.t}';`, (err, result, fields) => {
    console.log(result)
    res.render('insert', { title: "Dodaj", table: req.query.t, columns: result || err })
  })
})


app.listen(port, () => {
  console.log(`Aplikacja dziala na porcie: ${port}`)
})
