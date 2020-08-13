const Product = require('../models/Product');
const DB = require('../../db_connection');

function getAllProducts () {    
    return DB.read();
}

function create(product){
    var product = new Product(product);
    if (DB.write(product)) {
        return true;
    }
    return false;
}

function getFilteredProducts(productsIds) {
    let products = getAllProducts();
    var res = [];
    for (let i=0; i<products.length; i++) {
        for (let j=0; j<products.length; j++) {
            if (productsIds[j] == products[i].id) {
                res.push(products[i]);
            }
        }
        
    }
    return res;
}

var ProductController = {
    "create": create,
    "getAllProducts": getAllProducts,
    "getFilteredProducts": getFilteredProducts
}

module.exports = ProductController;