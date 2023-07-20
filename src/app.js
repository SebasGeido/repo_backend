import ProductManager from './ProductManager.js';
import CartManager from './CartManager.js';
import cartRouter from './routes/cart.router.js';
import productsRouter from './routes/products.router.js';
import viewsRouter from './routes/views.router.js';
import express from 'express';
import session from 'express-session';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import fs from 'fs/promises';
import mongoose from 'mongoose';
import {Server} from 'socket.io';
import {error} from 'console';
import passport from 'passport';
import path from 'path';
const app = express();
const httpServer = app.listen(8080, () => console.log("Escuchando en puerto 8080"));
const socketServer = new Server(httpServer);

app.set('handlebars', handlebars.engine());
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'handlebars');

export let clase_productos = new ProductManager();
export let clase_carrito = new CartManager();

clase_productos.appendProducts();
clase_carrito.appendCarts();

mongoose.connect('mongodb+srv://sebastian_geido:Chesito2003@cluster0.xokbmhy.mongodb.net/?retryWrites=true&w=majority')
    .catch((error) => {
        console.log("No se pudo conectar a la base de datos: "+ error);
        process.exit()
    });
app.use(express.json());
app.use('/api/products/',productsRouter);
app.use('/api/carts/',cartRouter);
app.use(express.static(path.join(__dirname,'public')));
app.use('/', viewsRouter);
app.use(session({
    secret: 'clave-secreta',
    resave: true,
    saveUninitialized: true,
}))

app.use(passport.initialize()); 
app.use(passport.session());
socketServer.on('connection', socket=>{
    console.log("Nuevo cliente conectado");
    fs.watch(__dirname + '/public/productos.json', (eventType, filename) => {
        socket.emit('fileChange', {message: 'El archivo ha sido actualizado'})
    })
})