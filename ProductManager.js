import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
class ProductManager{
    static currentID = 1;
    constructor() {
        this.path = './productos.json'
        this.products = []
        this.exists = fs.existsSync(this.path)
        if(this.exists){
            this.content = JSON.parse(fs.readFileSync(this.path,'utf-8'));
            fs.unlinkSync(this.path);
            for(let i = 0; i < this.content.length; i++) {
                this.products.push(this.content[i]);
            }
            ProductManager.currentID += this.content.length;
        }
        }
    addProduct(title, description, price, thumbnail, code, stock){
        let isFound = this.searchProductByCode(code);
        if(isFound === false){
            const newProduct = {
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
                ID: ProductManager.currentID,
            }
            this.products.push(newProduct)
            ProductManager.currentID++;
        }
        else{
            console.log("Error, este articulo ya está cargado.")
        }
    }
    deleteProduct(soughtID){
        for (let index = 0; index < this.products.length; index++) {
            if(soughtID === this.products[index].ID){
                this.products.splice(index,1);
                break;
            }
        }
    }
    updateProduct(soughtCode, parameter, newData){
        for (let index = 0; index < this.products.length; index++) {
            if(soughtCode === this.products[index].code){
                if(parameter == "title"){
                    this.products[index].title = newData
                }
                else if(parameter == "description"){
                    this.products[index].description = newData
                }
                else if(parameter == "price"){
                    this.products[index].price = newData
                }
                else if(parameter == "thumbnail"){
                    this.products[index].thumbnail = newData
                }
                else if(parameter == "code"){
                    this.products[index].code = newData
                }
                else if(parameter == "stock"){
                    this.products[index].stock = newData
                }
                break;
            }
        }
    }    
    searchProductByID(soughtID){
        let isFound = true;
        const result = this.products.find(({ID}) => ID === soughtID);
        if (result == undefined){
            isFound = false;
        }
        else{
            isFound = true
        }
        return isFound;
    }

    searchProductByCode(soughtCode){
        let isFound = false;
        for (let index = 0; index < this.products.length; index++) {
            if (soughtCode === this.products[index].code){
                isFound = true;
                break
            }
        }
        return isFound;
    }
    getProductByID(soughtID){
        let notFound = 'Not found';
        const result = this.products.find(({ID}) => ID === soughtID);
        let isFound = this.searchProductByID(soughtID)
        if(isFound === true) {
            return result;
        }
        else {
            return notFound;
        }
    }
    getProducts(){
        return this.products;
    }
    appendProducts(){
        fs.appendFile(this.path,JSON.stringify(this.products), function (err) {
            if (err) throw err;
            console.log('El contenido se ha agregado al archivo');
          });
    }
}

/*
let productos = new ProductManager();
let penaldo = productos.addProduct("Ronaldog", "el bicho siuuu", 200000,"qcyo",123124,125);
productos.deleteProduct(3);
let neymar = productos.addProduct("Neymar", "fuchibol fantastico", 200000,"qcyo",123125,125);
let todos = productos.getProducts();
console.log(todos);
productos.appendProducts()
*/
export default ProductManager;