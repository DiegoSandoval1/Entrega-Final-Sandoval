import { Router } from 'express';
import {
  deleteProductFromCart,
  updateCart,
  updateProductQuantity,
  clearCart,
  getCartById,
} from '../controllers/cart.controller.js';

const router = Router();

router.delete('/:cid/products/:pid', deleteProductFromCart);
router.put('/:cid', updateCart);
router.put('/:cid/products/:pid', updateProductQuantity);
router.delete('/:cid', clearCart);
router.get('/:cid', getCartById);

export default router;
