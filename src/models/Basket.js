'use strict';

function calcPriceTaxed (quantity, price, tax) {
    if( typeof quantity !== 'number'    ||
        typeof price    !== 'number'    ||
        typeof tax      !== 'number')
            throw new Error('Wrong type of parameters');
    
    let tValue = parseFloat((price) * tax / 100);
    let nearest = (Math.ceil(tValue*20)/20).toFixed(2);
    let result = parseFloat(price) + parseFloat(nearest);
    return (quantity * result).toFixed(2);
}
  
function calcSalesTaxes (quantity, price, priceTaxed) {
    return parseFloat(parseFloat(priceTaxed) - (parseFloat(price) * quantity)).toFixed(2);
}

function calculate(properties) {

    let {name, quantity, excepted, imported, price} = properties;
    let tax = 0;
  
    if(!excepted) {
        tax = tax + 10;
    }

    if(imported) {
        tax = tax + 5;
    }
    
    let priceTaxed = ((excepted && !imported) ? (quantity * price) : calcPriceTaxed(quantity, price, tax));
    let salesTaxes = ((excepted && !imported) ? 0 : calcSalesTaxes(quantity, price, priceTaxed))
    
    let cart = {
        name: name,
        quantity: quantity,
        excepted: excepted,
        imported: imported,
        price: Number(price),
        tax: tax,
        priceTaxed: Number(priceTaxed),
        salesTaxes: Number(salesTaxes)
    };

    return cart;

}

var Basket = {
    'calculate': calculate
};

module.exports = Basket;