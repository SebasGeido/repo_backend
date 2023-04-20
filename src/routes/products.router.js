import { Router } from "express";
const router = Router();
import { clase_productos } from "../app.js";

router.get('GET/', (req, res) => {
    let limite = parseInt(req.query.limite)
    if(!limite) return res.send({ productos })
    let productosLimitados = productos.slice(0, limite);
    res.send(productosLimitados) 
})

router.get('GET/:pid', (req, res) => {
    let ID = parseInt(req.params.pid);
    let producto = productos.find(e => e.ID === ID);
    if(!producto) return res.send({error: "Producto no encontrado"})
    res.send({producto})
})

router.get('POST/', (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let code = req.body.code;
    let price = req.body.price;
    let status = req.body.status;
    let stock = req.body.stock;
    let category = req.body.category;
    let thumbnails = req.body.thumbnails;
    clase_productos.addProduct(title,description,price,code,stock,status,category,thumbnails);
    res.end()
})

router.get('PUT/:pid', (req, res) => {
    let id = parseInt(req.params.pid);
    let idExiste = clase_productos.searchProductByID(id);
    if(idExiste){
        if(req.body.title) {
            clase_productos.updateProduct(id,"title",req.body.title);
        }
        if(req.body.description) {
            clase_productos.updateProduct(id,"description",req.body.description);
        }
        if(req.body.code) {
            clase_productos.updateProduct(id,"code",req.body.code);
        }
        if(req.body.price) {
            clase_productos.updateProduct(id,"price",req.body.price);
        }
        if(req.body.status) {
            clase_productos.updateProduct(id,"status",req.body.status);
        }
        if(req.body.stock) {
            clase_productos.updateProduct(id,"stock",req.body.stock);
        }
        if(req.body.category) {
            clase_productos.updateProduct(id,"category",req.body.category);
        }
        if(req.body.thumbnails) {
            clase_productos.updateProduct(id,"thumbnails",req.body.thumbnails);
        }
        res.end();
    }
    else {
        res.send("No existe un producto con el ID buscado");
    }
})

router.get('DELETE/:pid', (req, res) => {
    let id = parseInt(req.params.pid);
    let idExiste = clase_productos.searchProductByID(id);
    if(idExiste){
        clase_productos.deleteProduct(id);
        res.end()
    }    
    else {
        res.send("No existe un producto con el ID buscado");
    }
})

module.exports = router;