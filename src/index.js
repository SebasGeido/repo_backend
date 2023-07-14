import { Server } from "socket.io";

const socket = io();

socket.on('fileChange', data=>{
    console.log("El archivo fue actualizado.")
})