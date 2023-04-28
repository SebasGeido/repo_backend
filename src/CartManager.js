import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
class CartManager{
    static currentID = 1;
    constructor() {
        this.path = './public/carritos'
        this.carts = []
        this.exists = fs.existsSync(this.path)
        if(this.exists){
            this.content = JSON.parse(fs.readFileSync(this.path,'utf-8'));
            fs.unlinkSync(this.path);
            for(let i = 0; i < this.content.length; i++) {
                this.carts.push(this.content[i]);
            }
            CartManager.currentID += this.content.length;
        }
    }
    addCart(){
        const newCart = {
            ID: CartManager.currentID,
            products: {},
        }
        this.carts.push(newCart);
        CartManager.currentID++;
    }
    addProduct(){
        
    }
    searchProductByID(soughtID){
        let isFound = true;
        const result = this.carts.find(({ID}) => ID === soughtID);
        if (result == undefined){
            isFound = false;
        }
        else{
            isFound = true
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
    getCarts(){
        return this.carts;
    }
    appendCarts(){
        fs.appendFile(this.path,JSON.stringify(this.carts), function (err) {
            if (err) throw err;
            console.log('El contenido se ha agregado al archivo');
          });
    }
}

export default CartManager;