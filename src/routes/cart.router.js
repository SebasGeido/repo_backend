import { Router } from "express";
const router = Router();
import { clase_carrito } from "../app.js";
import { clase_productos } from "../app.js";

router.get('POST/', (req, res) => {
    clase_carrito.addProduct();
    res.end()
})

router.get('GET/:cid', (req, res) => {
    let idCarrito = req.params.cid;
    let idExiste = clase_carrito.searchProductByID(idCarrito);
    if(idExiste) {
        res.send(clase_carrito.getProductByID(idCarrito))
    }
    else{
        res.send('No existe un carrito con el ID buscado.')
    }
})

router.get('POST/:cid/product/:pid', (req, res) => {
    let idCarrito = req.params.cid;
    let idCarritoExiste = clase_carrito.searchProductByID(idCarrito);
    if(idCarritoExiste) {
        let idProducto = req.params.pid;
        let idProductoExiste = clase_productos.searchProductByID(idProducto);
        if(idProductoExiste){
            clase_carrito.carts[idCarrito].products[idProducto].IDproduct = idProducto;
            if("quantity" in clase_carrito.carts[idCarrito].products[idProducto]) {
                clase_carrito.carts[idCarrito].products[idProducto].quantity += 1;
            }
            else {clase_carrito.carts[idCarrito].products[idProducto].quantity = 1;}
        }
    }
    res.end()
})

export default router