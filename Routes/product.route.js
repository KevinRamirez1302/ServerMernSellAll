import { Router } from 'express'
import {
  getProduct,
  getbyidProduct,
  deleteProduct,
  createProduct
} from '../controllers/product.controller.js'
import { authRequired } from '../Middlewares/validateToken.js'
import { productsChema } from '../schemas/product.schema.js'
import { validateSchema } from '../Middlewares/validator.auth.js'
import { getProductByCategory } from '../controllers/product.controller.js'

const router = Router()

router.get('/getProducts', getProduct)
router.get('/allProducts', getProduct)
router.get('/allProducts/category/:category', getProductByCategory)
router.get('/products/:id', getbyidProduct)

router.post('/createProduct', validateSchema(productsChema), createProduct)

router.delete('/deleteProduct/:id', authRequired, deleteProduct)

export default router
