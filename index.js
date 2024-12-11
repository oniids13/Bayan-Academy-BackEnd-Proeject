const express = require('express')
const path = require('path')
const methodOverride = require('method-override')
const productRoutes = require('./server/routes/productRoutes')


const app  = express()

app.use(express.urlencoded({ extended: true}));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))


// Execute Routes
app.use('/items', productRoutes)



// 404 Page handler
app.use((req,res) => {
    res.render('error')
})








// // Wrong Routes
// app.get('*', (req, res) => {
//     res.render('error')
// })

app.listen(3000, () => {
    console.log(`Listening on http://localhost:3000/items`)
})