// Importación de módulos
import express from 'express';
import { engine } from 'express-handlebars'; // Cambiar aquí
import cartsRoutes from './routes/carts.routes.js';
import productRoutes from './routes/products.routes.js';
import { Server } from 'socket.io';
import http from 'http';

// Importación del módulo Express
const app = express();
const server = http.createServer(app);
const io = new Server(server); // Configuración de Socket.io

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars
app.engine('handlebars', engine()); // Cambiar aquí
app.set('view engine', 'handlebars');

// Número del puerto
const PORT = 8080;

// Endpoints de prueba
app.get('/', (req, res) => {
    res.send('¡Hola Mundo y todos quienes lo habitan!');
});

// Endpoint de prueba
app.get('/prueba', (req, res) => {
    res.send('<h1 style="color:red"> Esto es dominio es una prueba de concepto que se hizo de cara a la tarea 💀</h1>');
});

// Endpoint para usuarios
app.get('/usuario', (req, res) => {
    const usuarios = [
        { usuario: "fredo godofredo", edad: 120, dinero: 1000000000 },
        { usuario: "Puro Hueso", edad: "infinito", dinero: 1 },
        { usuario: "billy", edad: 12, dinero: -100 }
    ];
    res.send(usuarios);
});

// Params
app.get('/usuario2/:teo/:mateo', (req, res) => {
    console.log(req.params);
    res.send("usando params");
});

// Llamado de las routes
app.use('/api/products', productRoutes);
app.use('/api/carts', cartsRoutes);

// Ruta para la vista de productos en tiempo real
app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

// Arreglo para almacenar productos
let productos = [];

// Configuración de WebSocket
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    // Emitir la lista de productos al nuevo cliente
    socket.emit('productosActualizados', productos);

    // Manejar la creación de productos
    socket.on('agregarProducto', (producto) => {
        productos.push(producto);
        io.emit('productosActualizados', productos); // Actualizar a todos los clientes
    });
});

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor 💀 ejecutándose en http://localhost:${PORT}`);
});
