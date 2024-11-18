import { Router } from 'express';
import { getProducts } from '../controllers/product.controller.js';

const router = Router();

// Endpoint para obtener productos
router.get('/', getProducts);

export default router;
