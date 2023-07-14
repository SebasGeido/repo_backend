import { Router } from "express";
const router = Router();
const emailAdmin = "adminCoder@coder.com";
import { clase_productos } from "../app.js";
import { crearHash, esValidaContrasena } from "../utils.js";
import { userModel } from "../models/user.model.js";
import passport from "passport";

function autenticar(req, res, next) {
    if (req.session?.esAdmin) {
        return next()
    }
    return res.status(401).send('error de autenticacion')
}

router.get('/', (req, res) =>{
    if(req.session) {
        let productos = clase_productos.getProducts();
        let esAdmin = req.session.usuario.esAdmin;
        let nombreUsuario = req.session?.usuario.nombreUsuario;
        res.render('home', {
            productos, nombreUsuario: nombreUsuario, esAdmin: esAdmin});
        }
    else {
        //res.render('index');
        res.redirect('/inicioSesion')
    }
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

router.get('/github', passport.authenticate('github', {scope:['user:email']}), async(req, res) =>{})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/inicioSesion'}), async (req, res) => {
    req.session.usuario = req.usuario;
    res.redirect('/');
})

router.post('/registro', passport.authenticate('form', {failureRedirect: '/registroFallido'}), async (req,res) => {
    res.send({status:"success", message:"Usuario registrado"})
})

router.post('/registroFallido', async (req,res) => {
    console.log("Registro fallido");
    res.send({error:"Failed"})
})

router.get('/inicioSesion', (req, res) => {
    res.render('iniciarSesion', {layout: 'index'});
})

router.post('/inicioSesion', passport.authenticate('iniciarSesion', {failureRedirect: '/inicioSesionFallido'}), async (req, res) => {
    if(!req.usuario) return res.status(400).send({status:'error',error:'Credenciales invalidas'})
    req.session.usuario = {
        nombre: req.usuario.nombreUsuario,
        apellido: req.usuario.apellidoUsuario,
        email: req.usuario.email,
    }
    res.send({status:"exito", payload:req.usuario})
})

router.post('/inicioSesionFallido', (req,res) => {
    res.send({error:'Inicio de sesion fallido'})
})
export default router;