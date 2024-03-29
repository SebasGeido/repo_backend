import { Router } from "express";
const router = Router();
import { clase_productos } from "../app.js";
import { userModel } from "../models/user.model.js";
import passport from "passport";
import __dirname from "../utils.js";

function autenticar(req, res, next) {
    if (req.session?.esAdmin) {
        return next()
    }
    return res.status(401).send('error de autenticacion')
}

router.get('/', (req, res) =>{
    if(req.session) {
        let productos = clase_productos.getProducts();
        let esAdmin;
        if(req.usuario.rol == 'Admin'){
            esAdmin = true;
        }else{
            esAdmin = false;
        }
        let nombreUsuario = req.usuario.nombreUsuario;
        res.render('index', {
            productos, nombreUsuario: nombreUsuario, esAdmin: esAdmin});
        }
    else {
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
            req.logOut();
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

router.get('/registro', (req, res) => {
    res.sendFile(__dirname + '/views/layouts/registro.html');
})

router.post('/registro', passport.authenticate('form'/* {failureRedirect: '/registroFallido'}*/), async (req,res) => {
    res.send({status:"success", message:"Usuario registrado"});
    res.redirect('/inicioSesion');
})

router.post('/registroFallido', async (req,res) => {
    console.log("Registro fallido");
    res.send({error:"Failed"});
})

router.get('/inicioSesion', (req, res) => {
    res.sendFile(__dirname + '/views/layouts/iniciarSesion.html');
})

router.post('/inicioSesion', passport.authenticate('iniciarSesion', {failureRedirect: '/inicioSesionFallido'}), async (req, res) => {
    if(!req.body.usuario) return res.status(400).send({status:'error',error:'Credenciales invalidas'})
    const usuario = await userModel.findOne({email:req.body.emailUsuario})
    req.login(usuario, (error) => {
        if (error) {
            return done(error);
        }
    })
    res.send({status:"exito", payload:req.usuario})
})

router.get('/inicioSesionFallido', (req,res) => {
    res.send({error:'Inicio de sesion fallido'})
})
export default router;