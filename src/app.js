import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
import { __dirname } from './utils/database.js';
import path from 'path';

dotenv.config();

const app = express();

const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de handlebars
app.engine(
  'handlebars',
  handlebars.engine({
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    defaultLayout: 'main',
  })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Conexión a MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((err) => console.error('Error conectándose a MongoDB:', err));

// Rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

export default app;
