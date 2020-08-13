'use strict';

const ProductController = require('./Product');

function calculate(products){
    let productsList = ProductController.getFilteredProducts(products);

    let salesTaxes = 0;
    let total = 0;
    for(let i=0; i<productsList.length; i++) {
        salesTaxes = Math.round((parseFloat(productsList[i].salesTaxes) + salesTaxes) * 1e12) / 1e12;
        total = Math.round((parseFloat(productsList[i].priceTaxed) + total) * 1e12) / 1e12;
    }

    return {
        "products": productsList,
        "salesTaxes": salesTaxes,
        "total": total
    }
}

var Basket = {
    'calculate': calculate
}

module.exports = Basket;