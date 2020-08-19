'use strict';

var uniqid = require('uniqid');

function generateId() {
  return uniqid();
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
  
  let product = {
      id: generateId(),
      name: name,
      quantity: quantity,
      excepted: excepted,
      imported: imported,
      price: Number(price)
  };

  return product;

}

module.exports = Product;