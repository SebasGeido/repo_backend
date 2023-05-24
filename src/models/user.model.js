import mongoose from "mongoose";

const productCollection = 'productos';

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        index:true
    },
    description:String,
    code:{
        type:Number,
        unique:true
    },
    price:Number,
    status:Boolean,
    thumbnails:String,
    stock:String,
    category:String,
    ID:Number
})

export const productModel = mongoose.model(productCollection,productSchema)