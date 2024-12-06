const express = require('express')
const path = require('path')
const methodOverride = require('method-override')
const sampleDB = require('./seed')


const app  = express()

app.use(express.urlencoded({ extended: true}));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, 'public')))



app.get('/', (req, res) => {

    let items = sampleDB

    res.render('index', {items})
})


app.get('/add', (req, res) => {
    res.render('add')
})

app.listen(3000, () => {
    console.log(`Listening on http://localhost:3000`)
})