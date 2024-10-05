import { Router } from "express";
import { readDataFromFile, writeDataToFile } from '../utils.js';
import path from 'path';
import { fileURLToPath } from 'url';



const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsFilePath = path.join(__dirname, '../data/products.json');

let products = readDataFromFile(productsFilePath); 

// GET /
router.get('/', (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.json(products.slice(0, limit));
});

// GET /:pid
router.get('/:pid', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.pid));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// POST /
router.post('/', (req, res) => {
    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        price: req.body.price,
        status: req.body.status !== undefined ? req.body.status : true,
        stock: req.body.stock,
        category: req.body.category,
        thumbnails: req.body.thumbnails || []
    };
    products.push(newProduct);
    writeDataToFile(productsFilePath, products); 
    res.status(201).json(newProduct);
});

// PUT /:pid
router.put('/:pid', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.pid));
    if (productIndex === -1) return res.status(404).send('Producto no encontrado');

    const updatedProduct = { ...products[productIndex], ...req.body };
    products[productIndex] = updatedProduct;
    writeDataToFile(productsFilePath, products); 
    res.json(updatedProduct);
});

// DELETE /:pid
router.delete('/:pid', (req, res) => {
    products = products.filter(p => p.id !== parseInt(req.params.pid));
    writeDataToFile(productsFilePath, products); 
    res.status(204).send();
});


export default router;