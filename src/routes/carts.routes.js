import { Router } from "express"
import { readDataFromFile, writeDataToFile } from '../utils.js';
import path from 'path';

const router = Router();
const cartsFilePath = path.join(__dirname, '../carrito.json');

let carts = readDataFromFile(cartsFilePath); 

// POST /
router.post('/', (req, res) => {
    const newCart = {
        id: carts.length ? carts[carts.length - 1].id + 1 : 1,
        products: []
    };
    carts.push(newCart);
    writeDataToFile(cartsFilePath, carts); // Guardar en archivo
    res.status(201).json(newCart);
});

// GET /:cid
router.get('/:cid', (req, res) => {
    const cart = carts.find(c => c.id === parseInt(req.params.cid));
    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

// POST /:cid/product/:pid
router.post('/:cid/product/:pid', (req, res) => {
    const cart = carts.find(c => c.id === parseInt(req.params.cid));
    if (!cart) return res.status(404).send('Carrito no encontrado');

    const productId = parseInt(req.params.pid);
    const existingProduct = cart.products.find(p => p.product === productId);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.products.push({ product: productId, quantity: 1 });
    }

    writeDataToFile(cartsFilePath, carts); // Guardar en archivo
    res.json(cart.products);
});


export default router;