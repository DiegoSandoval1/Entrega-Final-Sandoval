// app.js
import express from 'express';
import { engine } from 'express-handlebars';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/products.routes.js';
import cartRoutes from './routes/carts.routes.js';
import Product from './models/Product.js';  // Asegúrate de tener el modelo Product

dotenv.config();
connectDB();

const app = express();

// Configurar Handlebars como motor de plantillas
app.engine('handlebars', engine({
    allowProtoPropertiesByDefault: true
}));
app.set('view engine', 'handlebars');

// Middleware para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas para la API
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Endpoint para renderizar la lista de productos
app.get('/products', async (req, res) => {
    try {
        // Obtener los productos desde la base de datos
        const products = await Product.find();
        // Renderizar la vista y pasar los productos
        res.render('products', { products });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar los productos');
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
