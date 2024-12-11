const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')


router.get('/', productController.products)
router.get('/add', productController.addItemForm)
router.post('/create-item', productController.addItem)
router.get('/:id/edit', productController.editItemForm)
router.put('/:id', productController.editItem)
router.get('/:id', productController.viewItem)
router.get('/:id/delete', productController.deleteItemPage)
router.delete('/:id', productController.deleteItem)
router.post('/search-item', productController.searchItem)


module.exports = router