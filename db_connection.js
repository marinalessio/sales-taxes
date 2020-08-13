const fs = require('fs');
const pathData = "./data/products.json";

function read () {
    let products = fs.readFileSync(pathData);
    let productsParsed = JSON.parse(products);
    return productsParsed;
}

function write(product){
    let products = fs.readFileSync(pathData);
    let productsParsed = JSON.parse(products);
    productsParsed.push(product);
    fs.writeFileSync(pathData, JSON.stringify(productsParsed));
    return true;
}

var DbConnection = {
    'read': read,
    'write': write
}

module.exports = DbConnection;