import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// Obtener el contenido de un carrito específico por su ID
export const getCartById = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id).populate('products.product');
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Crear un nuevo carrito vacío
export const createCart = async (req, res) => {
    try {
        const newCart = new Cart({ products: [] });
        await newCart.save();
        res.status(201).json({ status: 'success', payload: newCart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Agregar un producto al carrito o actualizar su cantidad
export const addProductToCart = async (req, res) => {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }

        const existingProductIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (existingProductIndex >= 0) {
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Actualizar la cantidad de un producto en el carrito
export const updateProductQuantity = async (req, res) => {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });
        }

        cart.products[productIndex].quantity = quantity;
        await cart.save();
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Eliminar un producto específico del carrito
export const removeProductFromCart = async (req, res) => {
    const { cartId, productId } = req.params;

    try {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        await cart.save();
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Vaciar el carrito eliminando todos los productos
export const emptyCart = async (req, res) => {
    const { cartId } = req.params;

    try {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        cart.products = [];
        await cart.save();
        res.json({ status: 'success', message: 'Carrito vaciado', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
