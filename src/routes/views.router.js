import { Router } from "express";
const router = Router();
import { clase_productos } from "../app.js";

router.get('/', (req, res) =>{
    let productos = clase_productos.getProducts();
    res.render('home', productos);
})

router.get('realtimeproducts/', (req, res) =>{
    let productos = clase_productos.getProducts();
    res.render('realTimeProducts', productos);
})
module.exports = router;