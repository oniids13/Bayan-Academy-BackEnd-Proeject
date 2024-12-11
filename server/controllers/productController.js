const mongoose = require('mongoose')
const Product = require('../../models/product')

mongoose.connect('mongodb://127.0.0.1:27017/inventory-db')
    .then(() => {
        console.log("Database connection open")
    })
    .catch(err => {
        console.log('Error')
        console.log(err)
    })

// List of all products
exports.products = async (req, res) => {
    const items = await Product.find({})

    // Page pagination
    const page = parseInt(req.query.page) || 1;
    const limit = 10; 
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedItems = items.slice(startIndex, endIndex);

    const totalPages = Math.ceil(items.length / limit);

    res.render('index', {items: paginatedItems,
                currentPage: page,
                totalPages})
}

// Get the add product form

exports.addItemForm = (req ,res) => {
    res.render('add')
}

// Add items

exports.addItem = async (req, res) => {
    const item = new Product(req.body)
    await item.save()
    res.redirect('/items')
}


// Get edit item form

exports.editItemForm = async (req, res) => {
    const item = await Product.findById(req.params.id)

    res.render('edit', {item})
}

// Edit item

exports.editItem = async (req, res) => {
    const {id} = req.params

    const item = await Product.findByIdAndUpdate(id, {...req.body})

    res.redirect(`/items/${id}`)
}

// View Item

exports.viewItem = async (req, res) => {
    const item = await Product.findById(req.params.id)

    res.render('item', {item})
}

// Delete item confirmation page
exports.deleteItemPage = async (req, res) => {
    const {id} = req.params

    const item = await Product.findById(id)

    res.render('delete', {item})
}


// Deleting Item
exports.deleteItem = async (req, res) => {
    const {id} = req.params

    await Product.findByIdAndDelete(id)

    res.redirect('/items')
}


// Search Items

exports.searchItem = async (req, res) => {
    const {search} = req.body

    const result = await Product.find({
        name: { $regex: search, $options: 'i'}
    })

    res.render('search', {items:result, search})
}


