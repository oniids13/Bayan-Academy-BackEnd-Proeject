const {v4: uuidv4} = require('uuid')

module.exports = [
    {
        id: uuidv4(),
        name: "Puma Deviate Nitro 2",
        category: "Shoes",
        quantity: 12,
        price: 7000,
        description: "Running shoes with carbon plated sole"
    },
    {
        id: uuidv4(),
        name: "Garmin Foreruner 55",
        category: "Watch",
        quantity: 10,
        price: 8999,
        description: "Smart watch for running"
    },
    {
        id: uuidv4(),
        name: "Hoka Singlet",
        category: "Apparel",
        quantity: 20,
        price: 850,
        description: "Running singlet with light weight fabric"
    }
]
