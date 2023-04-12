import e from 'express';
import ProductManager from './ProductManager.js';
import express from 'express';

const app = express();
let clase_productos = new ProductManager();
let productos = clase_productos.getProducts();
console.log(productos);
clase_productos.appendProducts()

app.get('/products', (req, res) => {
    let limite = parseInt(req.query.limite)
    if(!limite) return res.send({ productos })
    let productosLimitados = productos.slice(0, limite);
    res.send(pr) 
})

app.get('/products/:pid', (req, res) => {
    let ID = parseInt(req.params.pid);
    let producto = productos.find(e => e.ID === ID);
    if(!producto) return res.send({error: "Producto no encontrado"})
    res.send({producto})
})


app.listen(8080, () => console.log("Soy un programa que funcionaa"))