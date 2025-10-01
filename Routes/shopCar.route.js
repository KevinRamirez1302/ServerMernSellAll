import { Router } from 'express';
import {
  getCar,
  deleteItem,
  addItem,
} from '../controllers/shopCar.controller.js';
import { authRequired } from '../Middlewares/validateToken.js';
import { shopCar } from '../schemas/shopCar.schema.js';
import { validateSchema } from '../Middlewares/validator.auth.js';

const router = Router();

router.get('/getCar', authRequired, getCar);
router.delete('/deleteItem/:id', authRequired, deleteItem);
router.post('/addItem', authRequired, addItem);

export default router;
