import mongoose from "mongoose";

const coleccionUsuarios = 'usuarios';

const esquemaUsuarios = new mongoose.Schema({
    nombreUsuario: String,
    apellidoUsuario: String,
    email: {
        type: String,
        index:true,
    },
    rol: String,
    contrasena: {
        type: String,
        index:true,
    }
})

export const userModel = mongoose.model(coleccionUsuarios, esquemaUsuarios)