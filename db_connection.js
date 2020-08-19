const fs = require('fs');
const pathData = "/tmp/products.json";

function read () {
    try {
        if (fs.existsSync(pathData)) {
            let products = fs.readFileSync(pathData);
            let productsParsed = JSON.parse(products);
            return productsParsed;
        } else {
            fs.writeFileSync(pathData, JSON.stringify([]));
        }
    } catch(err) {
        console.error(err);
        return [];
    }
}

function write(product){
    try {
        if (fs.existsSync(pathData)) {
            let products = fs.readFileSync(pathData);
            let productsParsed = JSON.parse(products);
            productsParsed.push(product);
            fs.writeFileSync(pathData, JSON.stringify(productsParsed));
            return true;
        }
    } catch(err) {
        console.error(err);
        return false;
    }
}

var DbConnection = {
    'read': read,
    'write': write
}

module.exports = DbConnection;