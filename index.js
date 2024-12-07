const express = require('express')
const path = require('path')
const methodOverride = require('method-override')
const {v4: uuidv4} = require('uuid')
const sampleDB = require('./seed')


const app  = express()

app.use(express.urlencoded({ extended: true}));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))



// View all products
app.get('/items', (req, res) => {

    let items = sampleDB

    res.render('index', {items})
})

// Get the add product form
app.get('/add', (req, res) => {
    res.render('add')
})


// Get the edit product form
app.get('/edit/:id', (req, res) => {
    const {id} = req.params;
    const itemToEdit = sampleDB.find(item => id === item.id)

    res.render('edit', {item: itemToEdit})
})


// Create new product
app.post('/items', (req, res) => {
    const {name, category, quantity, price, description} = req.body
    const id = uuidv4()
    const newItem = {id, name, category, quantity, price, description}
    sampleDB.push(newItem)

    res.redirect('/items')
})

// Edit Items
app.put('/items/:id', (req, res) => {
    const {name, category, quantity, price, description} = req.body
    const {id} = req.params
    const itemToEdit = sampleDB.find(item => id === item.id)

    itemToEdit.name = name,
    itemToEdit.category = category,
    itemToEdit.quantity = quantity,
    itemToEdit.price = price,
    itemToEdit.description = description

    res.redirect('/items')
})


// Deleting Item
app.delete('/items/:id', (req, res) => {
    const {id} = req.params

    const index = sampleDB.findIndex(item => item.id === id)
    sampleDB.splice(index, 1 )

    res.redirect('/items')
})

// Wrong Routes
app.get('*', (req, res) => {
    res.render('error')
})

app.listen(3000, () => {
    console.log(`Listening on http://localhost:3000`)
})