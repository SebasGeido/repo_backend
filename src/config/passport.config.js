import passport from "passport";
import PassportLocal from "passport-local";
import { userModel } from "../models/user.model.js";
import { crearHash, esValidaContrasena } from "../utils.js";
const emailAdmin = "adminCoder@coder.com";

const inicializarPassport = () =>{
    passport.use('form', new PassportLocal.Strategy(
        {passReqToCallBack:true, usernameField:'email'}, async (req, nombreUsuario, contrasena, done) => {
            const {nombre, apellido, email} = req.body;
            try{
                let usuario = await userModel.findOne({email:nombreUsuario});
                let rol;
                if(usuario) {
                    console.log("El usuario ya existe");
                    return done(null, false);
                }
                if (email == emailAdmin) {
                    rol = 'admin';
                }
                else {
                    rol = 'usuario'
                }
                const nuevoUsuario = {
                    nombre,
                    apellido,
                    rol,
                    email,
                    contrasena:crearHash(contrasena)
                }
                let resultado = await userModel.create(nuevoUsuario);
                return done(null, resultado);
            }catch (error){
                return done("Error al obtener el usuario " +error);
            }
        }
    ))
    passport.serializeUser((usuario, done) => {
        done(null, usuario._id);   
    });
    
    passport.deserializeUser(async (id, done) => {
        let usuario = await userModel.findById(id);
        done(null, usuario);
    });
}
const inicializarPassportGithub = () =>{
    passport.use('github', new GitHub.Strategy({
        clientID:'Iv1.66f84664a90f5563',
        clientSecret: '74a27f45f1032c865fc494aaf52f74ae24bdb33f',
        callbackUrl: 'http://localhost:8080/'
    }, async (accessToken, refreshToken, profile, done) => {
        try{
            console.log(profile);
            let usuario = await userModel.findOne({email:profile._json.email})
            if(!user) {
                let nuevoUsuario = {
                    nombre:profile._json.usernameField,
                    apellido:'',
                    email:profile._json.email,
                    contrasena:'',
                }
                let resultado = await userModel.create(nuevoUsuario);
            }
            else{
                done(null, user);
            }
        }catch(error){
            return done(error);
        }
    }))
}
const logueo = () => {
    passport.use('iniciarSesion', new LocalStrategy({usernameField:'email'}, async(usuario, contrasena, done) =>{
        try{
            const usuario = await userModel.findOne({email:usuario})
            if(!user) {
                console.log("El usuario no existe")
                return done (null, false);
            }
            if(!esValidaContrasena(usuario, contrasena)) return done (null, false);
            return done (null, usuario);
        }catch(error){
            return done(error);
        }
    }))
}
export default inicializarPassport; logueo;