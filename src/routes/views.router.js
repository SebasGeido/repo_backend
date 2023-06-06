import { Router } from "express";
const router = Router();
const emailAdmin = "adminCoder@coder.com"
import { clase_productos } from "../app.js";
function autenticar(req, res, next) {
    if (req.session?.esAdmin) {
        return next()
    }
    return res.status(401).send('error de autenticacion')
}

router.get('/', (req, res) =>{
    if(req.session.inicioSesion == false) {
        res.redirect('/inicioSesion')
    }
    let productos = clase_productos.getProducts();
    let esAdmin = req.session.esAdmin;
    let nombreUsuario = req.session?.nombreUsuario;
    res.render('home', {
        productos, nombreUsuario: nombreUsuario, esAdmin: esAdmin});
})

router.get('realtimeproducts/', autenticar, (req, res) =>{
    let productos = clase_productos.getProducts();
    res.render('realTimeProducts', productos);
})

router.post('/cerrarSesion', (req, res) => {
    if (req.body.logoutButtonClicked) {
        req.session.destroy(err => {
            if (err) {
                return res.json({ status: 'ERROR Logout', body: err})
            }
            res.send('Deslogueado correctamente')
            res.redirect('/inicioSesion')
        })
    }
    res.render('cerrarSesion');
})

router.post('/inicioSesion', (req, res) => {
    let data = req.body;
    if (data.email == emailAdmin ){
        req.session.esAdmin = true;
        req.session.rol = "admin";
    }
    else{
        req.session.esAdmin = false;
        req.session.rol = "usuario";
    }
    req.session.nombreUsuario = data.nombreUsuario;
    req.session.apellidoUsuario = data.apellidoUsuario;
    req.session.contrasena = data.contrasena;
    req.session.inicioSesion = true;
    res.render('form');
    if(req.session.esAdmin){
        res.redirect('/')
    }
})
module.exports = router;