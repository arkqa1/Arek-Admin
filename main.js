const express = require('express')
const mysql = require('mysql')
const dotenv = require('dotenv')
const path = require('path')


dotenv.config()
const app = express()
const port = 3000
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res) => {
  res.render('index',{title:'Strona Glowna'})
})
app.get('/lista', (req, res) => {
//   console.log(GetFromDB("select * from wszystko"))
   res.render('lista', {Data:GetFromDB("select * from wszystko")})
 })

app.listen(port, () => {
  console.log(`Aplikacja dziala na porcie: ${port}`)
})

function GetFromDB(query){
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : process.env.USER,
      password : process.env.PASSWORD,
      database : 'komis'
    })
     
    connection.connect()
    let result 
    connection.query(query, function (error, results, fields) {
      if (error) throw error
      result = fields
    })
     
    connection.end()
    return result
}

