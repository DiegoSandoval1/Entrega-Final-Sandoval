import Cart from '../models/cart.model.js';

export const deleteProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    cart.products = cart.products.filter((p) => p.product.toString() !== pid);
    await cart.save();
    res.json({ status: 'success', message: 'Producto eliminado del carrito' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export const updateCart = async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;

  try {
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    cart.products = products;
    await cart.save();
    res.json({ status: 'success', message: 'Carrito actualizado' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export const updateProductQuantity = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    const product = cart.products.find((p) => p.product.toString() === pid);
    if (product) {
      product.quantity = quantity;
      await cart.save();
      res.json({ status: 'success', message: 'Cantidad actualizada' });
    } else {
      res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export const clearCart = async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    cart.products = [];
    await cart.save();
    res.json({ status: 'success', message: 'Carrito vaciado' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export const getCartById = async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await Cart.findById(cid).populate('products.product');
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    res.json({ status: 'success', payload: cart });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
