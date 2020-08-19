'use strict';

const ProductController = require('./Product');
const BasketModel = require('../models/Basket');

function calculate(products){
    let productsList = ProductController.getFilteredProducts(products);

    let salesTaxes = 0;
    let total = 0;
    let productsListCalculated = [];
    for(let i=0; i<productsList.length; i++) {
        let calculatedProduct = BasketModel.calculate(productsList[i]);
        salesTaxes = Math.round((parseFloat(calculatedProduct.salesTaxes) + salesTaxes) * 1e12) / 1e12;
        total = Math.round((parseFloat(calculatedProduct.priceTaxed) + total) * 1e12) / 1e12;
        productsListCalculated.push(calculatedProduct);
    }

    return {
        "products": productsListCalculated,
        "salesTaxes": salesTaxes,
        "total": total
    }
}

var Basket = {
    'calculate': calculate
}

module.exports = Basket;