//importación de routes
import express from 'express';
import cartsRoutes from './routes/carts.routes.js';
import productRoutes from './routes/products.routes.js';

// importación del modulo Express

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Número del puerto
const PORT = 8080 ;


//end points de prueba

app.get('/', (req, res) => {
    res.send('¡Hola Mundo y todos quienes lo habitan!');
});

app.get('/prueba', (req, res) => {
    res.send('<h1 style="color:red"> Esto es dominio es una prueba de concepto que se hizo de cara a la tarea 💀</h1>')
});

app.get('/usuario', (req, res) => {
    const usuarios = [
        {
            usuario: "fredo godofredo",
            edad: 120,
            dinero: 1000000000
        },
        {
            usuario: "Puro Hueso",
            edad: "infinito",
            dinero: 1
        },
        {
            usuario: "billy",
            edad: 12,
            dinero: -100
        }

    ];

    res.send(usuarios);
});

//params 

app.get('/usuario2/:teo/:mateo', (req, res) => {
    console.log(req.params);

    res.send("usando params");
});


//llamado de las routes
app.use('/api/products', productRoutes);
app.use('/api/carts', cartsRoutes);


// Iniciando el servidor 💀
app.listen(PORT, () => {
    console.log(`Servidor 💀 ejecutándose en http://localhost:${PORT}`);
});