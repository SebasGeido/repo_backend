import passport from "passport";
import PassportLocal from "passport-local";
import { userModel } from "../models/user.model.js";
import { crearHash, esValidaContrasena } from "../utils.js";
import LocalStrategy from 'passport-local';
const emailAdmin = "adminCoder@coder.com";

    passport.use('form', new PassportLocal.Strategy(
        {passReqToCallBack:true, usernameField:'nombre', passwordField:'constrasena'}, async ( email, contrasena, done) => {
            console.log(nombreUsuario);
            try{
                let usuario = await userModel.findOne({email:email});
                let rol;
                if(usuario) {
                    console.log("El usuario ya existe");
                    return done(null, false);
                }
                if (emailUsuario == emailAdmin) {
                    rol = 'admin';
                }
                else {
                    rol = 'usuario'
                }
                const nuevoUsuario = {
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
        done(null, usuario.email);   
    });
    
    passport.deserializeUser(async (email, done) => {
        let usuario = await userModel.findOne({email:email});
        done(null, usuario);
    });
/*    passport.use('github', new GitHub.Strategy({
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
*/
    passport.use('iniciarSesion', new LocalStrategy({usernameField:'email'}, async(email, contrasena, done) =>{
        try{
            const usuario = await userModel.findOne({email:email})
            if(!usuario) {
                console.log("El usuario no existe")
                return done (null, false);
            }
            if(!esValidaContrasena(usuario, contrasena)) return done (null, false, { message: 'La constraseña es incorrecta'});
            return done (null, usuario);
        }catch(error){
            return done(error);
        }
    }))
export default passport;