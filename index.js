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

    const page = parseInt(req.query.page) || 1;
    const limit = 10; 
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedItems = items.slice(startIndex, endIndex);

    const totalPages = Math.ceil(items.length / limit);

    res.render('index', {items: paginatedItems,
        currentPage: page,
        totalPages})
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


// Searching for an Item
app.post('/search', (req, res) => {
    const {search} = req.body

    const results = sampleDB.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))

    res.render('search', {items: results, search})
})



const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`); // Example dataset

app.get('/sample', (req, res) => {
    const page = parseInt(req.query.page) || 1; // Current page number, default is 1
    const limit = 10; // Number of items per page
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedItems = items.slice(startIndex, endIndex); // Items for the current page

    const totalPages = Math.ceil(items.length / limit);

    res.render('sample', {
        items: paginatedItems,
        currentPage: page,
        totalPages
    });
});


// Wrong Routes
app.get('*', (req, res) => {
    res.render('error')
})

app.listen(3000, () => {
    console.log(`Listening on http://localhost:3000`)
})