'use strict';

var uniqid = require('uniqid');

function generateId() {
  return uniqid();
}

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

function Product(properties){

  if(!properties){
    throw new Error('Product cannot be empty');
  }

  if(properties.price && isNaN(Number(properties.price))){
    throw new Error('Product price should be a number');
  }

  if(properties.tinyPrice && isNaN(Number(properties.tinyPrice))){
    throw new Error('Product price should be a number');
  }

  let {name, quantity, excepted, imported, price} = properties;
  
  if( typeof name     !== 'string'    ||
      typeof quantity !== 'number'    ||
      typeof excepted !== 'boolean'   ||
      typeof imported !== 'boolean'   ||
      typeof price    !== 'number')
      throw new Error('Wrong type of parameters');
  
  let tax = 0;
  
  if(!excepted) {
      tax = tax + 10;
  }

  if(imported) {
      tax = tax + 5;
  }
  
  let priceTaxed = ((excepted && !imported) ? (quantity * price) : calcPriceTaxed(quantity, price, tax));
  let salesTaxes = ((excepted && !imported) ? 0 : calcSalesTaxes(quantity, price, priceTaxed))
  
  let product = {
      id: generateId(),
      name: name,
      quantity: quantity,
      excepted: excepted,
      imported: imported,
      price: Number(price),
      tax: tax,
      priceTaxed: Number(priceTaxed),
      salesTaxes: Number(salesTaxes)
  };

  return product;

}

module.exports = Product;