import express from 'express';
import {
    getCartById,
    createCart,
    addProductToCart,
    updateProductQuantity,
    removeProductFromCart,
    emptyCart
} from '../controllers/cart.controller.js';

const router = express.Router();

// Crear un nuevo carrito
router.post('/', createCart);

// Obtener el carrito por ID
router.get('/:id', getCartById);

// Agregar un producto al carrito o actualizar su cantidad
router.post('/:cartId/products/:productId', addProductToCart);

// Actualizar la cantidad de un producto en el carrito
router.put('/:cartId/products/:productId', updateProductQuantity);

// Eliminar un producto del carrito
router.delete('/:cartId/products/:productId', removeProductFromCart);

// Vaciar el carrito
router.delete('/:cartId', emptyCart);

export default router;
