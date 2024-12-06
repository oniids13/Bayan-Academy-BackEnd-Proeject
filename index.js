const express = require('express')
const path = require('path')
const methodOverride = require('method-override')


const app  = express()

app.use(express.urlencoded({ extended: true}));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3000, () => {
    console.log(`Listening on http://localhost:3000`)
})