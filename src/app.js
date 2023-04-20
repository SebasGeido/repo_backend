import ProductManager from './ProductManager.js';
import CartManager from './CartManager.js';
import carritoRouter from './routes/carrito.router.js';
import productsRouter from './routes/products.router.js';
import express from 'express';

const app = express();
export let clase_productos = new ProductManager();
export let clase_carrito = new CartManager();

clase_productos.appendProducts();
clase_carrito.appendProducts();

app.use(express.json());
app.use('/api/products/',productsRouter);
app.use('/api/carts/',carritoRouter);


app.listen(8080, () => console.log("Escuchando en puerto 8080"))