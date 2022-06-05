const express = require('express')
const mysql = require('mysql')
const dotenv = require('dotenv')
const path = require('path')
const bodyParser = require('body-parser')

// load .env
dotenv.config()

// express setup
const app = express()
const port = 3000
app.use(express.static('public'))
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// ejs setup
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

/// mysql connection pool
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})
// router 

app.get('/', (req, res) => {
  res.render('index', { title: 'Strona Glowna' })
})

app.get('/table', (req, res) => {
  pool.query(`SELECT * FROM ${req.query.d}.${req.query.t};`, (err, result, fields) => {
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
    res.render('tables', { title: "Tabele", database: req.query.d, tables: result || err })
  })
})

app.get("/insert", (req, res) => {
  pool.query(`SELECT DISTINCT column_name FROM information_schema.columns WHERE table_name='${req.query.t}';`, (err, result, fields) => {
    res.render('insert', { title: "Dodaj", table: req.query.t, database: req.query.d, columns: result || err })
  })
})

app.get("/update", (req, res) => {
  pool.query(`SELECT * FROM ${req.query.d}.${req.query.t};`, (err, result, fields) => {
    res.render('update', { title: "Aktualizuj", database: req.query.d, table: req.query.t, data: result || err })
  })
})

app.get("/delete", (req, res) => {
  pool.query(`SELECT * FROM ${req.query.d}.${req.query.t};`, (err, result, fields) => {
    res.render('delete', { title: "Usuń", table: req.query.t, database: req.query.d, data: result || err })
  })
})

app.post("/insert", (req, res) => {
  const keys = Object.keys(req.body)
  const values = Object.values(req.body).map(v => `'${v}'`)
  const query = `INSERT INTO ${req.query.d}.${req.query.t} (${keys.join(", ")}) VALUES (${values.join(", ")});`
  pool.query(query, (err, result, fields) => {
    res.redirect('/table?d=' + req.query.d + '&t=' + req.query.t)
  })
})

// app.post("/delete", (req, res) => {
//   const data = req.body
//   console.log(data)
//   const toDelete = data.map(d => d.delete == 'on')
//   data.forEach(d => delete d.delete)
//   const requirements = data
//     .map((k, v) => `${k} = '${v}'`)
//     .join(" AND ")
//   console.log(requirements)
//   // const query = `DELETE FROM ${req.query.d}.${req.query.t} WHERE ${requirements};`
//   // pool.query(query, (err, result, fields) => {
//     res.redirect('/table?d=' + req.query.d + '&t=' + req.query.t)
//   // })
// })

app.get("/query", (req, res) => {
  res.render('query', { title: "Zapytanie" })
})

app.post("/query", (req, res) => {
  const query = req.body.command
  pool.query(query, (err, result, fields) => {
    res.render('query-result', { title: "Zapytanie", query: req.body.query, data: result, error: err })
  })
})

app.listen(port, () => {
  console.log(`Aplikacja dziala na porcie: ${port}`)
})
