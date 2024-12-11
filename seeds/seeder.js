const mongoose = require('mongoose')
const Product = require('../models/product')

mongoose.connect('mongodb://127.0.0.1:27017/inventory-db')
    .then(() => {
        console.log("Database connection open")
    })
    .catch(err => {
        console.log('Error')
        console.log(err)
    })

const seedDB = async () => {
    const products = new Product({
        name: "Puma Deviate Nitro 2",
        category: "Shoes",
        quantity: 12,
        price: 7000,
        description: "Running shoes with carbon plated sole"
    })
    await products.save()
}

seedDB().then(() => {
    mongoose.connection.close()
})